import concurrent.futures
import numpy as np
import os
import pandas as pd
from pathlib import Path
import pycountry
import pyshorteners
from utils import make_dir
from utils import write_to_csv
from utils import iso3_to_iso2


def shorten_url(url):
    s = pyshorteners.Shortener()
    return s.tinyurl.short(url)


def select_columns(df, end_or_interim):
    columns = [
        "name",
        "country",
        "iso2",
        "iso3",
        f"{end_or_interim}_target",
        f"{end_or_interim}_target_percentage_reduction",
        f"{end_or_interim}_target_baseline_year",
        f"{end_or_interim}_target_baseline_emissions",
        f"{end_or_interim}_target_intensity_unit",
        f"{end_or_interim}_target_target_emissions",
        f"{end_or_interim}_target_bau_emissions",
        f"{end_or_interim}_target_other",
        f"{end_or_interim}_target_year",
        f"{end_or_interim}_target_text",
        "source_url",
        "LEI",
        "locode_x",
        "ISO-3166-2",
    ]

    return df.loc[:, df.columns.isin(columns)]


if __name__ == "__main__":
    # Create directory to store output
    outputDir = "../data/processed/net_zero_tracker/"
    outputDir = os.path.abspath(outputDir)
    out_dir = Path(outputDir)

    # create directory if does not exist
    make_dir(path=out_dir.as_posix())

    # path to dataset
    fl = '../data/raw/net_zero_tracker/snapshot_2022-12-20_13-07-14.xlsx'
    fl = os.path.abspath(fl)

    # resource files
    fl_locode = '../resources/key_dict_LOCODE_to_climactor.csv'
    fl_locode = os.path.abspath(fl_locode)
    fl_missing_iso2 = '../resources/net-zero-tracker_missing_ISO-3166-2.csv'
    fl_missing_iso2 = os.path.abspath(fl_missing_iso2)
    fl_missing_locode = '../resources/net-zero-tracker_missing_locodes.csv'
    fl_missing_locode = os.path.abspath(fl_missing_locode)
    fl_isin_to_lei = '../resources/ISIN_LEI_20221222.csv'
    fl_isin_to_lei = os.path.abspath(fl_isin_to_lei)

    # ------------------------------------------
    # Publisher table
    # ------------------------------------------
    publisherDict = {
        'id': 'net_zero_tracker',
        'name': 'Net Zero Tracker',
        'URL': 'https://zerotracker.net/'
    }

    write_to_csv(outputDir=outputDir,
                 tableName='Publisher',
                 dataDict=publisherDict,
                 mode='w')

    # ------------------------------------------
    # DataSource table
    # ------------------------------------------
    datasourceDict = {
        'datasource_id': 'net_zero_tracker',
        'name': 'Net Zero Tracker',
        'publisher': f"{publisherDict['id']}",
        'published': '2022-01-01',
        'URL': 'https://zerotracker.net/'
    }

    write_to_csv(outputDir=outputDir,
                 tableName='DataSource',
                 dataDict=datasourceDict,
                 mode='w')

    # ------------------------------------------
    # Target table
    # ------------------------------------------
    df = pd.read_excel(fl)

    # drops eurpoean union
    filt = df['country'] != 'XXX'
    df = df.loc[filt]

    # get ISO2 from ISO3
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = [executor.submit(iso3_to_iso2, name, return_input=True)
                   for name in list(set(df['country']))]
        data = [f.result() for f in concurrent.futures.as_completed(results)]

    # return ISO as dataframe
    df_iso = pd.DataFrame(data, columns=['iso3', 'iso2'])

    # merge iso codes
    df_out = pd.merge(df, df_iso, left_on=['country'], right_on=['iso3'])

    # filter out actors with no targets
    filt = (df_out['end_target'] == 'No target') & (
        df_out['interim_target'] == 'No target')
    df_nt = df_out.loc[filt]

    # filter out actors with no targets
    filt = (df_out['end_target'] != 'No target') & (
        df_out['interim_target'] != 'No target')
    df_out = df_out.loc[filt]

    # filter for actor_type
    filt_end_target = (df_out['end_target'].notnull())
    filt_country = (df_out['actor_type'] == 'Country') & filt_end_target
    filt_region = (df_out['actor_type'] == 'Region') & filt_end_target
    filt_city = (df_out['actor_type'] == 'City') & filt_end_target
    filt_company = (df_out['actor_type'] == 'Company') & filt_end_target

    # 1. apply to actor_t{'Region', 'Company', 'Country', 'City'}
    filter_dict = {
        'country': filt_country,
        'region': filt_region,
        'city': filt_city,
        'company': filt_company
    }

    target_list = [
        'Emissions intensity target',
        'Emissions reduction target',
        'Reduction v. BAU'
    ]

    # select relevant columns
    column_type_dict = {
        "target_id": str,
        "actor_id": str,
        "target_type": str,
        "baseline_year": int,
        "target_year": int,
        "target_value": int,
        'target_unit': str,
        "URL": str,
        "datasource_id": str
    }

    # select actor type
    #actor_type = 'country'

    # list to append dataframe to
    dataframe_list = []
    dataframe_list_company = []

    for actor_type in filter_dict:

        filt = filter_dict[actor_type]
        df_raw_tmp = df_out.loc[filt]

        # ------------------------
        # process region
        # ------------------------
        if actor_type == 'region':
            data = []
            for country_code in sorted(set(df_raw_tmp['iso2'])):
                filt = df_raw_tmp['iso2'] == country_code
                df_filt = df_raw_tmp.loc[filt]

                for region in df_filt['name'].drop_duplicates():
                    try:
                        tmp = pycountry.subdivisions.lookup(region)
                        if tmp.country_code == country_code:
                            data.append((country_code, region, tmp.code))
                        else:
                            data.append((country_code, region, np.NaN))
                    except LookupError as e:
                        data.append((country_code, region, np.NaN))

            df_iso2_tmp = pd.DataFrame(
                data, columns=['iso2', 'name', 'ISO-3166-2'])

            # get not null values
            filt = df_iso2_tmp['ISO-3166-2'].notnull()
            df_iso2_tmp = df_iso2_tmp.loc[filt]

            # corrected ~70 using chatGPT and manually checking
            df_iso2_corrected = pd.read_csv(fl_missing_iso2).rename(
                columns={'ISO-3166-1': 'iso2'})

            # create final iso2 dataset
            df_iso2 = pd.concat([df_iso2_tmp, df_iso2_corrected])

            # merge with dataset (adds ISO-3166-2)
            df_raw_tmp = pd.merge(df_raw_tmp, df_iso2, on=['iso2', 'name'])

        # ------------------------
        # process cities
        # ------------------------
        if actor_type == 'city':
            df_locode = pd.read_csv(fl_locode)

            df_raw_tmp = pd.merge(
                df_raw_tmp,
                df_locode[['wrong', 'right', 'coerced_wrong', 'iso3', 'locode']],
                left_on=['name', 'country'],
                right_on=['wrong', 'iso3'],
                how='left'
            )

            df_locode_missing = pd.read_csv(fl_missing_locode, header=0)

            df_raw_tmp = pd.merge(df_raw_tmp, df_locode_missing,
                                  left_on=['name', 'iso2'],
                                  right_on=['name', 'ISO-3166-1'],
                                  how='left')

            df_raw_tmp['locode_x'] = df_raw_tmp['locode_x'].fillna(
                df_raw_tmp['locode_y'])

            df_raw_tmp = df_raw_tmp.loc[df_raw_tmp['locode_x'].notnull()]

        # ------------------------
        # process companies
        # ------------------------
        if actor_type == 'company':
            df_isin = pd.read_csv(fl_isin_to_lei)
            df_raw_tmp = pd.merge(df_raw_tmp, df_isin, left_on=[
                                  'isin_id'], right_on=['ISIN'])

        # ------------------------
        # loop over end and interim
        # ------------------------
        for end_or_interim in ['end', 'interim']:
            df_tmp = (
                select_columns(df_raw_tmp, end_or_interim)
                .query(f"{end_or_interim}_target in {target_list}")
                .rename(columns={
                    f"{end_or_interim}_target_baseline_year": "baseline_year",
                    f"{end_or_interim}_target_year": "target_year",
                    f"{end_or_interim}_target_percentage_reduction": "target_value",
                    f"{end_or_interim}_target": "target_type",
                    "source_url": "URL",
                })
                .query(f"target_year.notnull()")
                .assign(baseline_year=lambda x: x.baseline_year.fillna(x.target_year))
                .astype({'target_year': int, 'baseline_year': int})
                .assign(target_unit='percent', datasource_id=datasourceDict["datasource_id"])
            )

            if actor_type == 'country':
                df_tmp = df_tmp.rename(columns={"iso2": "actor_id"})
            if actor_type == 'region':
                df_tmp = df_tmp.rename(columns={"ISO-3166-2": "actor_id"})
            if actor_type == 'city':
                df_tmp = df_tmp.rename(columns={"locode_x": "actor_id"})
            if actor_type == 'company':
                df_tmp = df_tmp.rename(columns={"LEI": "actor_id"})

            # change target_type
            df_tmp.loc[df_tmp['target_type'] == 'Emissions reduction target',
                       'target_type'] = 'Absolute emission reduction'
            df_tmp.loc[df_tmp['target_type'] == 'Emissions intensity target',
                       'target_type'] = 'Relative emission reduction'
            df_tmp.loc[df_tmp['target_type'] == 'Reduction v. BAU',
                       'target_type'] = 'Relative emission reduction'
            df_tmp.loc[df_tmp['target_type'] ==
                       'Absolute emissions target'] = 'Absolute emission reduction'

            df_tmp['target_id'] = df_tmp.apply(lambda row:
                                               f"{datasourceDict['publisher']}:{row['actor_id']}:{row['target_year']}",
                                               axis=1)

            # set baseline year to target_year if NaN (this is for BAU scenarios)
            df_tmp["baseline_year"] = df_tmp["baseline_year"].fillna(
                df_tmp["target_year"])

            # save a copy of companies
            if actor_type == 'company':
                dataframe_list_company.append(df_tmp.copy())

            df_tmp = (
                df_tmp
                .loc[:, column_type_dict.keys()]
                .astype(column_type_dict)
                .sort_values(by=['actor_id', 'target_year'])
            )

            dataframe_list.append(df_tmp)

    # merge dataframes
    df_target = pd.concat(dataframe_list)

    # shorten long URLs (could be streamliend by not scanning entire file)
    filt = df_target['URL'].apply(len) > 250
    df_target.loc[filt, 'URL'] = df_target.loc[filt, 'URL'].apply(shorten_url)

    # save as csv
    df_target.drop_duplicates().to_csv(f'{outputDir}/Target.csv', index=False)

    # ------------------------------------------
    # Actor, ActorIdentifier, ActorName
    # ------------------------------------------
    # merge companies dataframes
    df_tmp_company = (
        pd.concat(dataframe_list_company)
        .rename(columns={'iso2': 'is_part_of'})
        .assign(type='organizaton',
                namespace='LEI',
                datasource_id='GLEIF_golden_copy',
                language='en',
                preferred='1'
                )
    )

    df_tmp_company['identifier'] = df_tmp_company['actor_id']

    # columns for each table type
    actor_columns = ['actor_id', 'type', 'name', 'is_part_of', 'datasource_id']
    actorIdentifier_columns = ['actor_id',
                               'identifier', 'namespace', 'datasource_id']
    actorName_columns = ['actor_id', 'name',
                         'language', 'preferred', 'datasource_id']

    # selected columns from df_tmp_company to create tables
    df_actor = df_tmp_company[actor_columns].drop_duplicates()
    df_actorIdentifier = df_tmp_company[actorIdentifier_columns].drop_duplicates(
    )
    df_actorName = df_tmp_company[actorName_columns].drop_duplicates()

    df_actor.drop_duplicates().to_csv(f'{outputDir}/Actor.csv', index=False)
    df_actorIdentifier.drop_duplicates().to_csv(
        f'{outputDir}/ActorIdentifier.csv', index=False)
    df_actorName.drop_duplicates().to_csv(
        f'{outputDir}/ActorName.csv', index=False)