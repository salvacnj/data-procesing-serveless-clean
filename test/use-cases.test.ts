import { DataEntity } from "../src/entity/data.entity";
import { ProcessDataUseCase } from "../src/usecase/process-data.use-case";

test("Uses Cases", () => {
  test("Process Data", () => {
    const processedData = ProcessDataUseCase.process(new DataEntity())

    expect(processedData).toHaveProperty("processedAt");
  });
});
