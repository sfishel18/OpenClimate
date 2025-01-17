const countryCodesJson = `
[
    {
      "name": "Afghanistan",
      "alpha-2": "AF",
      "alpha-3": "AFG",
      "country-code": "004"
    },
    {
      "name": "Albania",
      "alpha-2": "AL",
      "alpha-3": "ALB",
      "country-code": "008"
    },
    {
      "name": "Algeria",
      "alpha-2": "DZ",
      "alpha-3": "DZA",
      "country-code": "012"
    },
    {
      "name": "American Samoa",
      "alpha-2": "AS",
      "alpha-3": "ASM",
      "country-code": "016"
    },
    {
      "name": "Andorra",
      "alpha-2": "AD",
      "alpha-3": "AND",
      "country-code": "020"
    },
    {
      "name": "Angola",
      "alpha-2": "AO",
      "alpha-3": "AGO",
      "country-code": "024"
    },
    {
      "name": "Anguilla",
      "alpha-2": "AI",
      "alpha-3": "AIA",
      "country-code": "660"
    },
    {
      "name": "Antarctica",
      "alpha-2": "AQ",
      "alpha-3": "ATA",
      "country-code": "010"
    },
    {
      "name": "Antigua and Barbuda",
      "alpha-2": "AG",
      "alpha-3": "ATG",
      "country-code": "028"
    },
    {
      "name": "Argentina",
      "alpha-2": "AR",
      "alpha-3": "ARG",
      "country-code": "032"
    },
    {
      "name": "Armenia",
      "alpha-2": "AM",
      "alpha-3": "ARM",
      "country-code": "051"
    },
    {
      "name": "Aruba",
      "alpha-2": "AW",
      "alpha-3": "ABW",
      "country-code": "533"
    },
    {
      "name": "Australia",
      "alpha-2": "AU",
      "alpha-3": "AUS",
      "country-code": "036"
    },
    {
      "name": "Austria",
      "alpha-2": "AT",
      "alpha-3": "AUT",
      "country-code": "040"
    },
    {
      "name": "Azerbaijan",
      "alpha-2": "AZ",
      "alpha-3": "AZE",
      "country-code": "031"
    },
    {
      "name": "Bahamas",
      "alpha-2": "BS",
      "alpha-3": "BHS",
      "country-code": "044"
    },
    {
      "name": "Bahrain",
      "alpha-2": "BH",
      "alpha-3": "BHR",
      "country-code": "048"
    },
    {
      "name": "Bangladesh",
      "alpha-2": "BD",
      "alpha-3": "BGD",
      "country-code": "050"
    },
    {
      "name": "Barbados",
      "alpha-2": "BB",
      "alpha-3": "BRB",
      "country-code": "052"
    },
    {
      "name": "Belarus",
      "alpha-2": "BY",
      "alpha-3": "BLR",
      "country-code": "112"
    },
    {
      "name": "Belgium",
      "alpha-2": "BE",
      "alpha-3": "BEL",
      "country-code": "056"
    },
    {
      "name": "Belize",
      "alpha-2": "BZ",
      "alpha-3": "BLZ",
      "country-code": "084"
    },
    {
      "name": "Benin",
      "alpha-2": "BJ",
      "alpha-3": "BEN",
      "country-code": "204"
    },
    {
      "name": "Bermuda",
      "alpha-2": "BM",
      "alpha-3": "BMU",
      "country-code": "060"
    },
    {
      "name": "Bhutan",
      "alpha-2": "BT",
      "alpha-3": "BTN",
      "country-code": "064"
    },
    {
      "name": "Bolivia (Plurinational State of)",
      "alpha-2": "BO",
      "alpha-3": "BOL",
      "country-code": "068"
    },
    {
      "name": "Bonaire, Sint Eustatius and Saba",
      "alpha-2": "BQ",
      "alpha-3": "BES",
      "country-code": "535"
    },
    {
      "name": "Bosnia and Herzegovina",
      "alpha-2": "BA",
      "alpha-3": "BIH",
      "country-code": "070"
    },
    {
      "name": "Botswana",
      "alpha-2": "BW",
      "alpha-3": "BWA",
      "country-code": "072"
    },
    {
      "name": "Bouvet Island",
      "alpha-2": "BV",
      "alpha-3": "BVT",
      "country-code": "074"
    },
    {
      "name": "Brazil",
      "alpha-2": "BR",
      "alpha-3": "BRA",
      "country-code": "076"
    },
    {
      "name": "British Indian Ocean Territory",
      "alpha-2": "IO",
      "alpha-3": "IOT",
      "country-code": "086"
    },
    {
      "name": "Brunei Darussalam",
      "alpha-2": "BN",
      "alpha-3": "BRN",
      "country-code": "096"
    },
    {
      "name": "Bulgaria",
      "alpha-2": "BG",
      "alpha-3": "BGR",
      "country-code": "100"
    },
    {
      "name": "Burkina Faso",
      "alpha-2": "BF",
      "alpha-3": "BFA",
      "country-code": "854"
    },
    {
      "name": "Burundi",
      "alpha-2": "BI",
      "alpha-3": "BDI",
      "country-code": "108"
    },
    {
      "name": "Cabo Verde",
      "alpha-2": "CV",
      "alpha-3": "CPV",
      "country-code": "132"
    },
    {
      "name": "Cambodia",
      "alpha-2": "KH",
      "alpha-3": "KHM",
      "country-code": "116"
    },
    {
      "name": "Cameroon",
      "alpha-2": "CM",
      "alpha-3": "CMR",
      "country-code": "120"
    },
    {
      "name": "Canada",
      "alpha-2": "CA",
      "alpha-3": "CAN",
      "country-code": "124"
    },
    {
      "name": "Cayman Islands",
      "alpha-2": "KY",
      "alpha-3": "CYM",
      "country-code": "136"
    },
    {
      "name": "Central African Republic",
      "alpha-2": "CF",
      "alpha-3": "CAF",
      "country-code": "140"
    },
    {
      "name": "Chad",
      "alpha-2": "TD",
      "alpha-3": "TCD",
      "country-code": "148"
    },
    {
      "name": "Chile",
      "alpha-2": "CL",
      "alpha-3": "CHL",
      "country-code": "152"
    },
    {
      "name": "China",
      "alpha-2": "CN",
      "alpha-3": "CHN",
      "country-code": "156"
    },
    {
      "name": "Christmas Island",
      "alpha-2": "CX",
      "alpha-3": "CXR",
      "country-code": "162"
    },
    {
      "name": "Cocos (Keeling) Islands",
      "alpha-2": "CC",
      "alpha-3": "CCK",
      "country-code": "166"
    },
    {
      "name": "Colombia",
      "alpha-2": "CO",
      "alpha-3": "COL",
      "country-code": "170"
    },
    {
      "name": "Comoros",
      "alpha-2": "KM",
      "alpha-3": "COM",
      "country-code": "174"
    },
    {
      "name": "Congo",
      "alpha-2": "CG",
      "alpha-3": "COG",
      "country-code": "178"
    },
    {
      "name": "Congo, Democratic Republic of the",
      "alpha-2": "CD",
      "alpha-3": "COD",
      "country-code": "180"
    },
    {
      "name": "Cook Islands",
      "alpha-2": "CK",
      "alpha-3": "COK",
      "country-code": "184"
    },
    {
      "name": "Costa Rica",
      "alpha-2": "CR",
      "alpha-3": "CRI",
      "country-code": "188"
    },
    {
      "name": "Croatia",
      "alpha-2": "HR",
      "alpha-3": "HRV",
      "country-code": "191"
    },
    {
      "name": "Cuba",
      "alpha-2": "CU",
      "alpha-3": "CUB",
      "country-code": "192"
    },
    {
      "name": "Curaçao",
      "alpha-2": "CW",
      "alpha-3": "CUW",
      "country-code": "531"
    },
    {
      "name": "Cyprus",
      "alpha-2": "CY",
      "alpha-3": "CYP",
      "country-code": "196"
    },
    {
      "name": "Czechia",
      "alpha-2": "CZ",
      "alpha-3": "CZE",
      "country-code": "203"
    },
    {
      "name": "Côte d'Ivoire",
      "alpha-2": "CI",
      "alpha-3": "CIV",
      "country-code": "384"
    },
    {
      "name": "Denmark",
      "alpha-2": "DK",
      "alpha-3": "DNK",
      "country-code": "208"
    },
    {
      "name": "Djibouti",
      "alpha-2": "DJ",
      "alpha-3": "DJI",
      "country-code": "262"
    },
    {
      "name": "Dominica",
      "alpha-2": "DM",
      "alpha-3": "DMA",
      "country-code": "212"
    },
    {
      "name": "Dominican Republic",
      "alpha-2": "DO",
      "alpha-3": "DOM",
      "country-code": "214"
    },
    {
      "name": "Ecuador",
      "alpha-2": "EC",
      "alpha-3": "ECU",
      "country-code": "218"
    },
    {
      "name": "Egypt",
      "alpha-2": "EG",
      "alpha-3": "EGY",
      "country-code": "818"
    },
    {
      "name": "El Salvador",
      "alpha-2": "SV",
      "alpha-3": "SLV",
      "country-code": "222"
    },
    {
      "name": "Equatorial Guinea",
      "alpha-2": "GQ",
      "alpha-3": "GNQ",
      "country-code": "226"
    },
    {
      "name": "Eritrea",
      "alpha-2": "ER",
      "alpha-3": "ERI",
      "country-code": "232"
    },
    {
      "name": "Estonia",
      "alpha-2": "EE",
      "alpha-3": "EST",
      "country-code": "233"
    },
    {
      "name": "Eswatini",
      "alpha-2": "SZ",
      "alpha-3": "SWZ",
      "country-code": "748"
    },
    {
      "name": "Ethiopia",
      "alpha-2": "ET",
      "alpha-3": "ETH",
      "country-code": "231"
    },
    {
      "name": "Falkland Islands (Malvinas)",
      "alpha-2": "FK",
      "alpha-3": "FLK",
      "country-code": "238"
    },
    {
      "name": "Faroe Islands",
      "alpha-2": "FO",
      "alpha-3": "FRO",
      "country-code": "234"
    },
    {
      "name": "Fiji",
      "alpha-2": "FJ",
      "alpha-3": "FJI",
      "country-code": "242"
    },
    {
      "name": "Finland",
      "alpha-2": "FI",
      "alpha-3": "FIN",
      "country-code": "246"
    },
    {
      "name": "France",
      "alpha-2": "FR",
      "alpha-3": "FRA",
      "country-code": "250"
    },
    {
      "name": "French Guiana",
      "alpha-2": "GF",
      "alpha-3": "GUF",
      "country-code": "254"
    },
    {
      "name": "French Polynesia",
      "alpha-2": "PF",
      "alpha-3": "PYF",
      "country-code": "258"
    },
    {
      "name": "French Southern Territories",
      "alpha-2": "TF",
      "alpha-3": "ATF",
      "country-code": "260"
    },
    {
      "name": "Gabon",
      "alpha-2": "GA",
      "alpha-3": "GAB",
      "country-code": "266"
    },
    {
      "name": "Gambia",
      "alpha-2": "GM",
      "alpha-3": "GMB",
      "country-code": "270"
    },
    {
      "name": "Georgia",
      "alpha-2": "GE",
      "alpha-3": "GEO",
      "country-code": "268"
    },
    {
      "name": "Germany",
      "alpha-2": "DE",
      "alpha-3": "DEU",
      "country-code": "276"
    },
    {
      "name": "Ghana",
      "alpha-2": "GH",
      "alpha-3": "GHA",
      "country-code": "288"
    },
    {
      "name": "Gibraltar",
      "alpha-2": "GI",
      "alpha-3": "GIB",
      "country-code": "292"
    },
    {
      "name": "Greece",
      "alpha-2": "GR",
      "alpha-3": "GRC",
      "country-code": "300"
    },
    {
      "name": "Greenland",
      "alpha-2": "GL",
      "alpha-3": "GRL",
      "country-code": "304"
    },
    {
      "name": "Grenada",
      "alpha-2": "GD",
      "alpha-3": "GRD",
      "country-code": "308"
    },
    {
      "name": "Guadeloupe",
      "alpha-2": "GP",
      "alpha-3": "GLP",
      "country-code": "312"
    },
    {
      "name": "Guam",
      "alpha-2": "GU",
      "alpha-3": "GUM",
      "country-code": "316"
    },
    {
      "name": "Guatemala",
      "alpha-2": "GT",
      "alpha-3": "GTM",
      "country-code": "320"
    },
    {
      "name": "Guernsey",
      "alpha-2": "GG",
      "alpha-3": "GGY",
      "country-code": "831"
    },
    {
      "name": "Guinea",
      "alpha-2": "GN",
      "alpha-3": "GIN",
      "country-code": "324"
    },
    {
      "name": "Guinea-Bissau",
      "alpha-2": "GW",
      "alpha-3": "GNB",
      "country-code": "624"
    },
    {
      "name": "Guyana",
      "alpha-2": "GY",
      "alpha-3": "GUY",
      "country-code": "328"
    },
    {
      "name": "Haiti",
      "alpha-2": "HT",
      "alpha-3": "HTI",
      "country-code": "332"
    },
    {
      "name": "Heard Island and McDonald Islands",
      "alpha-2": "HM",
      "alpha-3": "HMD",
      "country-code": "334"
    },
    {
      "name": "Holy See",
      "alpha-2": "VA",
      "alpha-3": "VAT",
      "country-code": "336"
    },
    {
      "name": "Honduras",
      "alpha-2": "HN",
      "alpha-3": "HND",
      "country-code": "340"
    },
    {
      "name": "Hong Kong",
      "alpha-2": "HK",
      "alpha-3": "HKG",
      "country-code": "344"
    },
    {
      "name": "Hungary",
      "alpha-2": "HU",
      "alpha-3": "HUN",
      "country-code": "348"
    },
    {
      "name": "Iceland",
      "alpha-2": "IS",
      "alpha-3": "ISL",
      "country-code": "352"
    },
    {
      "name": "India",
      "alpha-2": "IN",
      "alpha-3": "IND",
      "country-code": "356"
    },
    {
      "name": "Indonesia",
      "alpha-2": "ID",
      "alpha-3": "IDN",
      "country-code": "360"
    },
    {
      "name": "Iran (Islamic Republic of)",
      "alpha-2": "IR",
      "alpha-3": "IRN",
      "country-code": "364"
    },
    {
      "name": "Iraq",
      "alpha-2": "IQ",
      "alpha-3": "IRQ",
      "country-code": "368"
    },
    {
      "name": "Ireland",
      "alpha-2": "IE",
      "alpha-3": "IRL",
      "country-code": "372"
    },
    {
      "name": "Isle of Man",
      "alpha-2": "IM",
      "alpha-3": "IMN",
      "country-code": "833"
    },
    {
      "name": "Israel",
      "alpha-2": "IL",
      "alpha-3": "ISR",
      "country-code": "376"
    },
    {
      "name": "Italy",
      "alpha-2": "IT",
      "alpha-3": "ITA",
      "country-code": "380"
    },
    {
      "name": "Jamaica",
      "alpha-2": "JM",
      "alpha-3": "JAM",
      "country-code": "388"
    },
    {
      "name": "Japan",
      "alpha-2": "JP",
      "alpha-3": "JPN",
      "country-code": "392"
    },
    {
      "name": "Jersey",
      "alpha-2": "JE",
      "alpha-3": "JEY",
      "country-code": "832"
    },
    {
      "name": "Jordan",
      "alpha-2": "JO",
      "alpha-3": "JOR",
      "country-code": "400"
    },
    {
      "name": "Kazakhstan",
      "alpha-2": "KZ",
      "alpha-3": "KAZ",
      "country-code": "398"
    },
    {
      "name": "Kenya",
      "alpha-2": "KE",
      "alpha-3": "KEN",
      "country-code": "404"
    },
    {
      "name": "Kiribati",
      "alpha-2": "KI",
      "alpha-3": "KIR",
      "country-code": "296"
    },
    {
      "name": "Korea (Democratic People's Republic of)",
      "alpha-2": "KP",
      "alpha-3": "PRK",
      "country-code": "408"
    },
    {
      "name": "Korea, Republic of",
      "alpha-2": "KR",
      "alpha-3": "KOR",
      "country-code": "410"
    },
    {
      "name": "Kuwait",
      "alpha-2": "KW",
      "alpha-3": "KWT",
      "country-code": "414"
    },
    {
      "name": "Kyrgyzstan",
      "alpha-2": "KG",
      "alpha-3": "KGZ",
      "country-code": "417"
    },
    {
      "name": "Lao People's Democratic Republic",
      "alpha-2": "LA",
      "alpha-3": "LAO",
      "country-code": "418"
    },
    {
      "name": "Latvia",
      "alpha-2": "LV",
      "alpha-3": "LVA",
      "country-code": "428"
    },
    {
      "name": "Lebanon",
      "alpha-2": "LB",
      "alpha-3": "LBN",
      "country-code": "422"
    },
    {
      "name": "Lesotho",
      "alpha-2": "LS",
      "alpha-3": "LSO",
      "country-code": "426"
    },
    {
      "name": "Liberia",
      "alpha-2": "LR",
      "alpha-3": "LBR",
      "country-code": "430"
    },
    {
      "name": "Libya",
      "alpha-2": "LY",
      "alpha-3": "LBY",
      "country-code": "434"
    },
    {
      "name": "Liechtenstein",
      "alpha-2": "LI",
      "alpha-3": "LIE",
      "country-code": "438"
    },
    {
      "name": "Lithuania",
      "alpha-2": "LT",
      "alpha-3": "LTU",
      "country-code": "440"
    },
    {
      "name": "Luxembourg",
      "alpha-2": "LU",
      "alpha-3": "LUX",
      "country-code": "442"
    },
    {
      "name": "Macao",
      "alpha-2": "MO",
      "alpha-3": "MAC",
      "country-code": "446"
    },
    {
      "name": "Madagascar",
      "alpha-2": "MG",
      "alpha-3": "MDG",
      "country-code": "450"
    },
    {
      "name": "Malawi",
      "alpha-2": "MW",
      "alpha-3": "MWI",
      "country-code": "454"
    },
    {
      "name": "Malaysia",
      "alpha-2": "MY",
      "alpha-3": "MYS",
      "country-code": "458"
    },
    {
      "name": "Maldives",
      "alpha-2": "MV",
      "alpha-3": "MDV",
      "country-code": "462"
    },
    {
      "name": "Mali",
      "alpha-2": "ML",
      "alpha-3": "MLI",
      "country-code": "466"
    },
    {
      "name": "Malta",
      "alpha-2": "MT",
      "alpha-3": "MLT",
      "country-code": "470"
    },
    {
      "name": "Marshall Islands",
      "alpha-2": "MH",
      "alpha-3": "MHL",
      "country-code": "584"
    },
    {
      "name": "Martinique",
      "alpha-2": "MQ",
      "alpha-3": "MTQ",
      "country-code": "474"
    },
    {
      "name": "Mauritania",
      "alpha-2": "MR",
      "alpha-3": "MRT",
      "country-code": "478"
    },
    {
      "name": "Mauritius",
      "alpha-2": "MU",
      "alpha-3": "MUS",
      "country-code": "480"
    },
    {
      "name": "Mayotte",
      "alpha-2": "YT",
      "alpha-3": "MYT",
      "country-code": "175"
    },
    {
      "name": "Mexico",
      "alpha-2": "MX",
      "alpha-3": "MEX",
      "country-code": "484"
    },
    {
      "name": "Micronesia (Federated States of)",
      "alpha-2": "FM",
      "alpha-3": "FSM",
      "country-code": "583"
    },
    {
      "name": "Moldova, Republic of",
      "alpha-2": "MD",
      "alpha-3": "MDA",
      "country-code": "498"
    },
    {
      "name": "Monaco",
      "alpha-2": "MC",
      "alpha-3": "MCO",
      "country-code": "492"
    },
    {
      "name": "Mongolia",
      "alpha-2": "MN",
      "alpha-3": "MNG",
      "country-code": "496"
    },
    {
      "name": "Montenegro",
      "alpha-2": "ME",
      "alpha-3": "MNE",
      "country-code": "499"
    },
    {
      "name": "Montserrat",
      "alpha-2": "MS",
      "alpha-3": "MSR",
      "country-code": "500"
    },
    {
      "name": "Morocco",
      "alpha-2": "MA",
      "alpha-3": "MAR",
      "country-code": "504"
    },
    {
      "name": "Mozambique",
      "alpha-2": "MZ",
      "alpha-3": "MOZ",
      "country-code": "508"
    },
    {
      "name": "Myanmar",
      "alpha-2": "MM",
      "alpha-3": "MMR",
      "country-code": "104"
    },
    {
      "name": "Namibia",
      "alpha-2": "NA",
      "alpha-3": "NAM",
      "country-code": "516"
    },
    {
      "name": "Nauru",
      "alpha-2": "NR",
      "alpha-3": "NRU",
      "country-code": "520"
    },
    {
      "name": "Nepal",
      "alpha-2": "NP",
      "alpha-3": "NPL",
      "country-code": "524"
    },
    {
      "name": "Netherlands",
      "alpha-2": "NL",
      "alpha-3": "NLD",
      "country-code": "528"
    },
    {
      "name": "New Caledonia",
      "alpha-2": "NC",
      "alpha-3": "NCL",
      "country-code": "540"
    },
    {
      "name": "New Zealand",
      "alpha-2": "NZ",
      "alpha-3": "NZL",
      "country-code": "554"
    },
    {
      "name": "Nicaragua",
      "alpha-2": "NI",
      "alpha-3": "NIC",
      "country-code": "558"
    },
    {
      "name": "Niger",
      "alpha-2": "NE",
      "alpha-3": "NER",
      "country-code": "562"
    },
    {
      "name": "Nigeria",
      "alpha-2": "NG",
      "alpha-3": "NGA",
      "country-code": "566"
    },
    {
      "name": "Niue",
      "alpha-2": "NU",
      "alpha-3": "NIU",
      "country-code": "570"
    },
    {
      "name": "Norfolk Island",
      "alpha-2": "NF",
      "alpha-3": "NFK",
      "country-code": "574"
    },
    {
      "name": "North Macedonia",
      "alpha-2": "MK",
      "alpha-3": "MKD",
      "country-code": "807"
    },
    {
      "name": "Northern Mariana Islands",
      "alpha-2": "MP",
      "alpha-3": "MNP",
      "country-code": "580"
    },
    {
      "name": "Norway",
      "alpha-2": "NO",
      "alpha-3": "NOR",
      "country-code": "578"
    },
    {
      "name": "Oman",
      "alpha-2": "OM",
      "alpha-3": "OMN",
      "country-code": "512"
    },
    {
      "name": "Pakistan",
      "alpha-2": "PK",
      "alpha-3": "PAK",
      "country-code": "586"
    },
    {
      "name": "Palau",
      "alpha-2": "PW",
      "alpha-3": "PLW",
      "country-code": "585"
    },
    {
      "name": "Palestine, State of",
      "alpha-2": "PS",
      "alpha-3": "PSE",
      "country-code": "275"
    },
    {
      "name": "Panama",
      "alpha-2": "PA",
      "alpha-3": "PAN",
      "country-code": "591"
    },
    {
      "name": "Papua New Guinea",
      "alpha-2": "PG",
      "alpha-3": "PNG",
      "country-code": "598"
    },
    {
      "name": "Paraguay",
      "alpha-2": "PY",
      "alpha-3": "PRY",
      "country-code": "600"
    },
    {
      "name": "Peru",
      "alpha-2": "PE",
      "alpha-3": "PER",
      "country-code": "604"
    },
    {
      "name": "Philippines",
      "alpha-2": "PH",
      "alpha-3": "PHL",
      "country-code": "608"
    },
    {
      "name": "Pitcairn",
      "alpha-2": "PN",
      "alpha-3": "PCN",
      "country-code": "612"
    },
    {
      "name": "Poland",
      "alpha-2": "PL",
      "alpha-3": "POL",
      "country-code": "616"
    },
    {
      "name": "Portugal",
      "alpha-2": "PT",
      "alpha-3": "PRT",
      "country-code": "620"
    },
    {
      "name": "Puerto Rico",
      "alpha-2": "PR",
      "alpha-3": "PRI",
      "country-code": "630"
    },
    {
      "name": "Qatar",
      "alpha-2": "QA",
      "alpha-3": "QAT",
      "country-code": "634"
    },
    {
      "name": "Romania",
      "alpha-2": "RO",
      "alpha-3": "ROU",
      "country-code": "642"
    },
    {
      "name": "Russian Federation",
      "alpha-2": "RU",
      "alpha-3": "RUS",
      "country-code": "643"
    },
    {
      "name": "Rwanda",
      "alpha-2": "RW",
      "alpha-3": "RWA",
      "country-code": "646"
    },
    {
      "name": "Réunion",
      "alpha-2": "RE",
      "alpha-3": "REU",
      "country-code": "638"
    },
    {
      "name": "Saint Barthélemy",
      "alpha-2": "BL",
      "alpha-3": "BLM",
      "country-code": "652"
    },
    {
      "name": "Saint Helena, Ascension and Tristan da Cunha",
      "alpha-2": "SH",
      "alpha-3": "SHN",
      "country-code": "654"
    },
    {
      "name": "Saint Kitts and Nevis",
      "alpha-2": "KN",
      "alpha-3": "KNA",
      "country-code": "659"
    },
    {
      "name": "Saint Lucia",
      "alpha-2": "LC",
      "alpha-3": "LCA",
      "country-code": "662"
    },
    {
      "name": "Saint Martin (French part)",
      "alpha-2": "MF",
      "alpha-3": "MAF",
      "country-code": "663"
    },
    {
      "name": "Saint Pierre and Miquelon",
      "alpha-2": "PM",
      "alpha-3": "SPM",
      "country-code": "666"
    },
    {
      "name": "Saint Vincent and the Grenadines",
      "alpha-2": "VC",
      "alpha-3": "VCT",
      "country-code": "670"
    },
    {
      "name": "Samoa",
      "alpha-2": "WS",
      "alpha-3": "WSM",
      "country-code": "882"
    },
    {
      "name": "San Marino",
      "alpha-2": "SM",
      "alpha-3": "SMR",
      "country-code": "674"
    },
    {
      "name": "Sao Tome and Principe",
      "alpha-2": "ST",
      "alpha-3": "STP",
      "country-code": "678"
    },
    {
      "name": "Saudi Arabia",
      "alpha-2": "SA",
      "alpha-3": "SAU",
      "country-code": "682"
    },
    {
      "name": "Senegal",
      "alpha-2": "SN",
      "alpha-3": "SEN",
      "country-code": "686"
    },
    {
      "name": "Serbia",
      "alpha-2": "RS",
      "alpha-3": "SRB",
      "country-code": "688"
    },
    {
      "name": "Seychelles",
      "alpha-2": "SC",
      "alpha-3": "SYC",
      "country-code": "690"
    },
    {
      "name": "Sierra Leone",
      "alpha-2": "SL",
      "alpha-3": "SLE",
      "country-code": "694"
    },
    {
      "name": "Singapore",
      "alpha-2": "SG",
      "alpha-3": "SGP",
      "country-code": "702"
    },
    {
      "name": "Sint Maarten (Dutch part)",
      "alpha-2": "SX",
      "alpha-3": "SXM",
      "country-code": "534"
    },
    {
      "name": "Slovakia",
      "alpha-2": "SK",
      "alpha-3": "SVK",
      "country-code": "703"
    },
    {
      "name": "Slovenia",
      "alpha-2": "SI",
      "alpha-3": "SVN",
      "country-code": "705"
    },
    {
      "name": "Solomon Islands",
      "alpha-2": "SB",
      "alpha-3": "SLB",
      "country-code": "090"
    },
    {
      "name": "Somalia",
      "alpha-2": "SO",
      "alpha-3": "SOM",
      "country-code": "706"
    },
    {
      "name": "South Africa",
      "alpha-2": "ZA",
      "alpha-3": "ZAF",
      "country-code": "710"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "alpha-2": "GS",
      "alpha-3": "SGS",
      "country-code": "239"
    },
    {
      "name": "South Sudan",
      "alpha-2": "SS",
      "alpha-3": "SSD",
      "country-code": "728"
    },
    {
      "name": "Spain",
      "alpha-2": "ES",
      "alpha-3": "ESP",
      "country-code": "724"
    },
    {
      "name": "Sri Lanka",
      "alpha-2": "LK",
      "alpha-3": "LKA",
      "country-code": "144"
    },
    {
      "name": "Sudan",
      "alpha-2": "SD",
      "alpha-3": "SDN",
      "country-code": "729"
    },
    {
      "name": "Suriname",
      "alpha-2": "SR",
      "alpha-3": "SUR",
      "country-code": "740"
    },
    {
      "name": "Svalbard and Jan Mayen",
      "alpha-2": "SJ",
      "alpha-3": "SJM",
      "country-code": "744"
    },
    {
      "name": "Sweden",
      "alpha-2": "SE",
      "alpha-3": "SWE",
      "country-code": "752"
    },
    {
      "name": "Switzerland",
      "alpha-2": "CH",
      "alpha-3": "CHE",
      "country-code": "756"
    },
    {
      "name": "Syrian Arab Republic",
      "alpha-2": "SY",
      "alpha-3": "SYR",
      "country-code": "760"
    },
    {
      "name": "Taiwan, Province of China",
      "alpha-2": "TW",
      "alpha-3": "TWN",
      "country-code": "158"
    },
    {
      "name": "Tajikistan",
      "alpha-2": "TJ",
      "alpha-3": "TJK",
      "country-code": "762"
    },
    {
      "name": "Tanzania, United Republic of",
      "alpha-2": "TZ",
      "alpha-3": "TZA",
      "country-code": "834"
    },
    {
      "name": "Thailand",
      "alpha-2": "TH",
      "alpha-3": "THA",
      "country-code": "764"
    },
    {
      "name": "Timor-Leste",
      "alpha-2": "TL",
      "alpha-3": "TLS",
      "country-code": "626"
    },
    {
      "name": "Togo",
      "alpha-2": "TG",
      "alpha-3": "TGO",
      "country-code": "768"
    },
    {
      "name": "Tokelau",
      "alpha-2": "TK",
      "alpha-3": "TKL",
      "country-code": "772"
    },
    {
      "name": "Tonga",
      "alpha-2": "TO",
      "alpha-3": "TON",
      "country-code": "776"
    },
    {
      "name": "Trinidad and Tobago",
      "alpha-2": "TT",
      "alpha-3": "TTO",
      "country-code": "780"
    },
    {
      "name": "Tunisia",
      "alpha-2": "TN",
      "alpha-3": "TUN",
      "country-code": "788"
    },
    {
      "name": "Turkey",
      "alpha-2": "TR",
      "alpha-3": "TUR",
      "country-code": "792"
    },
    {
      "name": "Turkmenistan",
      "alpha-2": "TM",
      "alpha-3": "TKM",
      "country-code": "795"
    },
    {
      "name": "Turks and Caicos Islands",
      "alpha-2": "TC",
      "alpha-3": "TCA",
      "country-code": "796"
    },
    {
      "name": "Tuvalu",
      "alpha-2": "TV",
      "alpha-3": "TUV",
      "country-code": "798"
    },
    {
      "name": "Uganda",
      "alpha-2": "UG",
      "alpha-3": "UGA",
      "country-code": "800"
    },
    {
      "name": "Ukraine",
      "alpha-2": "UA",
      "alpha-3": "UKR",
      "country-code": "804"
    },
    {
      "name": "United Arab Emirates",
      "alpha-2": "AE",
      "alpha-3": "ARE",
      "country-code": "784"
    },
    {
      "name": "United Kingdom of Great Britain and Northern Ireland",
      "alpha-2": "GB",
      "alpha-3": "GBR",
      "country-code": "826"
    },
    {
      "name": "United States Minor Outlying Islands",
      "alpha-2": "UM",
      "alpha-3": "UMI",
      "country-code": "581"
    },
    {
      "name": "United States of America",
      "alpha-2": "US",
      "alpha-3": "USA",
      "country-code": "840"
    },
    {
      "name": "Uruguay",
      "alpha-2": "UY",
      "alpha-3": "URY",
      "country-code": "858"
    },
    {
      "name": "Uzbekistan",
      "alpha-2": "UZ",
      "alpha-3": "UZB",
      "country-code": "860"
    },
    {
      "name": "Vanuatu",
      "alpha-2": "VU",
      "alpha-3": "VUT",
      "country-code": "548"
    },
    {
      "name": "Venezuela (Bolivarian Republic of)",
      "alpha-2": "VE",
      "alpha-3": "VEN",
      "country-code": "862"
    },
    {
      "name": "Viet Nam",
      "alpha-2": "VN",
      "alpha-3": "VNM",
      "country-code": "704"
    },
    {
      "name": "Virgin Islands (British)",
      "alpha-2": "VG",
      "alpha-3": "VGB",
      "country-code": "092"
    },
    {
      "name": "Virgin Islands (U.S.)",
      "alpha-2": "VI",
      "alpha-3": "VIR",
      "country-code": "850"
    },
    {
      "name": "Wallis and Futuna",
      "alpha-2": "WF",
      "alpha-3": "WLF",
      "country-code": "876"
    },
    {
      "name": "Western Sahara",
      "alpha-2": "EH",
      "alpha-3": "ESH",
      "country-code": "732"
    },
    {
      "name": "Yemen",
      "alpha-2": "YE",
      "alpha-3": "YEM",
      "country-code": "887"
    },
    {
      "name": "Zambia",
      "alpha-2": "ZM",
      "alpha-3": "ZMB",
      "country-code": "894"
    },
    {
      "name": "Zimbabwe",
      "alpha-2": "ZW",
      "alpha-3": "ZWE",
      "country-code": "716"
    },
    {
      "name": "Åland Islands",
      "alpha-2": "AX",
      "alpha-3": "ALA",
      "country-code": "248"
    }
  ]`;
/*
const GetCountryCodes = () => {
    let countryParsed = <any[]>JSON.parse(countryCodesJson);
    const countries:ICountry[] = countryParsed.map(c => {
        return {
            name: c.name,
            codeAlpha2: c["alpha-2"],
            codeAlpha3: c["alpha-3"]
        }
    });

    return countries;
}*/

export default countryCodesJson;
