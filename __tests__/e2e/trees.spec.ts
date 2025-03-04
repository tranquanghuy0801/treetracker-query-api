import supertest from 'supertest';
import app from '../../server/app';

describe("trees", () => {

  it("trees/{id}", async () => {
    const response = await supertest(app).get("/trees/912681");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 912681,
      lat: expect.anything(),
      lon: expect.anything(),
    });
  })

  it("trees?limit=1&offset=0", async () => {
    const response = await supertest(app).get("/trees?limit=1&offset=0");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      trees: expect.anything(),
    });
  });

  it("trees?limit=1&organization_id=11", async () => {
    const response = await supertest(app).get("/trees?limit=1&organization_id=11");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      trees: expect.anything(),
    });
    expect(response.body.trees[0]).toMatchObject({
      organization_id: 11,
    });
  }, 1000*60);

  it("trees/featured", async () => {
    const response = await supertest(app).get("/trees/featured");
    expect(response.status).toBe(200);
    // expect(response.body).toMatchObject({
    //   trees: expect.anything(),
    // });
    expect(response.body.trees[0]).toMatchObject({
      id: expect.any(Number),
    });
  }, 1000*10);

})