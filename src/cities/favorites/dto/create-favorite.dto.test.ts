import { validate } from "class-validator";
import { CreateFavoriteDto } from "./create-favorite.dto";

describe("CreateFavoriteDto", () => {
    it("should validate successfully with valid data", async () => {
        const dto = new CreateFavoriteDto();
        dto.name = "London";
        dto.region = "England";
        dto.country = "United Kingdom";
        dto.latitude = 51.5074;
        dto.longitude = -0.1278;

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it("should fail validation if required fields are missing", async () => {
        const dto = new CreateFavoriteDto();

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.map(err => err.property)).toEqual(
            expect.arrayContaining(["name", "region", "country", "latitude", "longitude"])
        );
    });

    it("should fail validation if name exceeds max length", async () => {
        const dto = new CreateFavoriteDto();
        dto.name = "a".repeat(101); // Exceeds max length of 100
        dto.region = "England";
        dto.country = "United Kingdom";
        dto.latitude = 51.5074;
        dto.longitude = -0.1278;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe("name");
    });

    it("should fail validation if latitude is invalid", async () => {
        const dto = new CreateFavoriteDto();
        dto.name = "London";
        dto.region = "England";
        dto.country = "United Kingdom";
        dto.latitude = 100;
        dto.longitude = -0.1278;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe("latitude");
    });

    it("should fail validation if longitude is invalid", async () => {
        const dto = new CreateFavoriteDto();
        dto.name = "London";
        dto.region = "England";
        dto.country = "United Kingdom";
        dto.latitude = 51.5074;
        dto.longitude = 200;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe("longitude");
    });

    it("should fail validation if URL is invalid", async () => {
        const dto = new CreateFavoriteDto();
        dto.name = "London";
        dto.region = "England";
        dto.country = "United Kingdom";
        dto.latitude = 51.5074;
        dto.longitude = -0.1278;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe("url");
    });
});