if __name__ == '__main__':
    import concurrent.futures
    import os
    from pathlib import Path
    import pandas as pd
    from utils import make_dir
    from utils import write_to_csv
    from utils import iso3_to_iso2
    from utils import df_wide_to_long

    # output directory
    outputDir = '../data/processed/EDGARv7.0/'
    outputDir = os.path.abspath(outputDir)
    make_dir(path=Path(outputDir).as_posix())

    # raw data file path
    fl = '../data/raw/EDGARv7.0/EDGARv7.0_GHG_AR4_AR5.xlsx'
    fl = os.path.abspath(fl)

    # =================================================================
    # Publisher
    # =================================================================
    publisherDict = {
        'id': 'JRC',
        'name': 'Joint Research Centre',
        'URL': 'https://commission.europa.eu/about-european-commission/departments-and-executive-agencies/joint-research-centre_en'
    }

    write_to_csv(outputDir=outputDir,
                 tableName='Publisher',
                 dataDict=publisherDict,
                 mode='w')
    # =================================================================
    # DataSource
    # =================================================================
    datasourceDict = {
        'datasource_id': 'EDGARv7.0:ghg',
        'name': 'Emissions Database for Global Atmospheric Research version 7.0',
        'publisher': f"{publisherDict['id']}",
        'published': '2022-01-01',
        'URL': 'https://edgar.jrc.ec.europa.eu/dataset_ghg70'
    }

    write_to_csv(outputDir=outputDir,
                 tableName='DataSource',
                 dataDict=datasourceDict,
                 mode='w')

    # read data from file
    df = pd.read_excel(fl, header=4)

    # =================================================================
    # EmissionsAgg
    # =================================================================
    # Total GHG emissions from EDGARv7.0: https://edgar.jrc.ec.europa.eu/dataset_ghg70
    # GHG emissions are expressed in Mton CO2eq. They are aggregated using Global Warming Potential values from IPCC AR4 (GWP-100 AR4)
    # GHG emissions include CO2 (fossil only), CH4, N2O and F-gases
    # we do not have SCG (serbia and monenagro) in our database

    # ANT listed as Curaçao, but correct ISO3 code is CUW
    df.loc[df['EDGAR Country Code'] == 'ANT', 'EDGAR Country Code'] = 'CUW'

    df_long = df_wide_to_long(df=df,
                              value_name="emissions",
                              var_name="year")

    # units are megatonnes of CO2eq
    Mt_to_t = 10**6
    df_long['total_emissions'] = df_long['emissions'].apply(
        lambda x: x * Mt_to_t)

    # get ISO2 from ISO3
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = [executor.submit(iso3_to_iso2, name, return_input=True)
                   for name in list(set(df_long['EDGAR Country Code']))]
        data = [f.result() for f in concurrent.futures.as_completed(results)]

    # return ISO as dataframe
    df_iso = pd.DataFrame(data, columns=['iso3', 'actor_id'])

    # merge in the actor_ids (iso2 codes)
    df_out = pd.merge(df_long, df_iso, left_on=[
                      'EDGAR Country Code'], right_on=['iso3'])

    # sum over sectors (returns NaN if any NaN in the group)
    # replace .apply(...) with .sum() if you want to ignore NaNs
    df_emissions = (
        df_out[['actor_id', 'year', 'total_emissions']]
        .groupby(by=['actor_id', 'year'])
        .apply(lambda x: x['total_emissions'].sum() if x['total_emissions'].isnull().sum() == 0 else float('NaN'))
        .reset_index()
    ).rename(columns={0: 'total_emissions'})

    # drop NaNs
    df_emissions = df_emissions.loc[df_emissions['total_emissions'].notnull()]

    # create datasource_id
    df_emissions['datasource_id'] = datasourceDict['datasource_id']

    # create emissions ID
    df_emissions['emissions_id'] = df_emissions.apply(
        lambda row: f"{row['datasource_id']}:{row['actor_id']}:{row['year']}", axis=1)

    # Create EmissionsAgg table
    emissionsAggColumns = [
        "emissions_id",
        "actor_id",
        "year",
        "total_emissions",
        "datasource_id"
    ]

    df_emissionsAgg = df_emissions[emissionsAggColumns]

    # ensure columns have correct types
    df_emissionsAgg = df_emissionsAgg.astype({'emissions_id': str,
                                              'actor_id': str,
                                              'year': int,
                                              'total_emissions': int,
                                              'datasource_id': str})

    # sort by actor_id and year
    df_emissionsAgg = df_emissionsAgg.sort_values(by=['actor_id', 'year'])

    # convert to csv
    df_emissionsAgg.to_csv(f'{outputDir}/EmissionsAgg.csv', index=False)

    # =================================================================
    # sectors
    # =================================================================
    sectors = list(set(df_out['Sector']))

    df_sector = pd.DataFrame({
        'sector_id': [f"EDGARv7.0:sector:{val}" for val in sectors],
        'name': sectors}
    )

    df_sector['namespace'] = 'EDGARv7.0:sector'
    df_sector['datasource_id'] = datasourceDict['datasource_id']

    # clean up the column and make sure type is correct
    sectorColumns = [
        "sector_id",
        "name",
        "namespace",
        "datasource_id"
    ]

    df_sector = df_sector[sectorColumns]

    # ensure columns have correct types
    df_sector = df_sector.astype({
        'sector_id': str,
        'name': str,
        'namespace': str,
        'datasource_id': str
    })

    # sort by actor_id and year
    df_sector = df_sector.sort_values(by=['sector_id'])

    # convert to csv
    df_sector.to_csv(f'{outputDir}/Sector.csv', index=False)

    # =================================================================
    # EmissionsBySector
    # =================================================================
    df_emissionsBySector = pd.merge(df_out, df_sector, left_on=[
                                    'Sector'], right_on=['name'])

    # create emissions ID
    df_emissionsBySector['emissions_id'] = df_emissionsBySector.apply(
        lambda row: f"{row['datasource_id']}:{row['actor_id']}:{row['year']}", axis=1)

    filt = df_emissionsBySector['emissions_id'].isin(
        list(df_emissionsAgg['emissions_id']))
    df_emissionsBySector = df_emissionsBySector.loc[filt]

    emissionsBySectorColumns = [
        "emissions_id",
        "sector_id",
        "total_emissions"
    ]

    df_emissionsBySector = (
        df_emissionsBySector[emissionsBySectorColumns]
        .rename(columns={'total_emissions': 'emissions_value'})
        .astype({
            'emissions_id': str,
            'sector_id': str,
            'emissions_value': int
        })
    )

    # convert to csv
    df_emissionsBySector.to_csv(
        f'{outputDir}/EmissionsBySector.csv', index=False)