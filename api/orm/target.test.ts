// target.test.ts -- tests for ORM Target

import {Actor} from './actor'
import {DataSource} from './datasource'
import {Publisher} from './publisher'
import {Target} from './target'
const disconnect = require('./init').disconnect

const publisherProps = {
    id: "target.test.ts:publisher:1",
    name: "Fake publisher from target.test.ts",
    URL: "https://fake.example/publisher"
}

const datasourceProps = {
    datasource_id: "target.test.ts:datasource:1",
    name: "Fake datasource from target.test.ts",
    publisher: publisherProps.id,
    published: new Date(2022, 10, 12),
    URL: "https://fake.example/datasource"
}

const countryProps = {
    actor_id: "target.test.ts:actor:country:1",
    type: "country",
    name: "Fake country actor from target.test.ts",
    datasource_id: datasourceProps.datasource_id
}

const regionProps = {
    actor_id: "target.test.ts:actor:region:1",
    type: "adm1",
    name: "Fake region actor from target.test.ts",
    is_part_of: countryProps.actor_id,
    datasource_id: datasourceProps.datasource_id
}

// Different targets in different years

const countryTarget1Props = {
    target_id: "target.test.ts:target:1",
    actor_id: countryProps.actor_id,
    target_type: "absolute",
    baseline_year: 2015,
    baseline_value: 100000000,
    target_year: 2025,
    target_value: 50000000,
    datasource_id: datasourceProps.datasource_id,
    URL: "https://fake.example/countrytarget1",
    summary: "#1 target by a country to make some changes"
}

const countryTarget2Props = {
    target_id: "target.test.ts:target:2",
    actor_id: countryProps.actor_id,
    target_type: "percent",
    baseline_year: 2020,
    baseline_value: 100000000,
    target_year: 2030,
    target_value: 75,
    target_units: "percent",
    datasource_id: datasourceProps.datasource_id,
    URL: "https://fake.example/countrytarget2",
    summary: "#1 target by a country to make some changes"
}

// Different actor, different identifiers

const regionTarget1Props = {
    target_id: "target.test.ts:target:3",
    actor_id: regionProps.actor_id,
    target_type: "percent",
    baseline_year: 2022,
    baseline_value: 10000000,
    target_year: 2030,
    target_value: 75,
    target_units: "percent",
    datasource_id: datasourceProps.datasource_id,
    URL: "https://fake.example/regiontarget3",
    summary: "#3 target by a region to make some changes"
}

async function cleanup() {

   await Target.destroy({where: {datasource_id: datasourceProps.datasource_id}})
   await Actor.destroy({where: {datasource_id: datasourceProps.datasource_id}})
   await DataSource.destroy({where: {datasource_id: datasourceProps.datasource_id}})
   await Publisher.destroy({where: {id: publisherProps.id}})
}

beforeAll(async () => {

    await cleanup()

    // Create referenced rows

    await Publisher.create(publisherProps)
    await DataSource.create(datasourceProps)
    await Actor.create(countryProps)
    await Actor.create(regionProps)
})

afterAll(async () => {

    // Clean up if there were failed tests

    await cleanup()

    // Close database connections

    await disconnect()
})

it("can create and get targets", async () => {

    let [c1, c2, r1] = await Promise.all([
        Target.create(countryTarget1Props),
        Target.create(countryTarget2Props),
        Target.create(regionTarget1Props)
    ])

    // Match on primary key

    let match = await Target.findByPk(countryTarget1Props.target_id)

    expect(match.actor_id).toEqual(countryTarget1Props.actor_id)

    expect(match.URL).toBeDefined()
    expect(typeof(match.URL)).toEqual("string")

    expect(match.summary).toBeDefined()
    expect(typeof(match.summary)).toEqual("string")

    // Match on Actor

    let matches = await Target.findAll({where: {
        actor_id: countryProps.actor_id
    }})

    expect(matches.length).toEqual(2)

    // Destroy all targets

    await Promise.all([
        c1.destroy(),
        c2.destroy(),
        r1.destroy()
    ])
})