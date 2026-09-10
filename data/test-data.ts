export default class TestData {
    /**
     * Test data combinations
     *
     * 1. Dropdown
     *  - Tokyo CURA Healthcare Center
     *  - Hongkong CURA Healthcare Center
     *  - Seoul CURA Healthcare Center
     *
     * 2. Healthcare Program
     *  - Medicare
     *  - Medicaid
     *  - None
     *
     * 3. Different date
     * - 15/07/2026
     * - 07/06/2026
     * - 29/03/2026
     */
    static makeAppointmentTestData() {
        // returns an array of objects with combination of data to insert in the tests
        return [
            { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "15/07/2026", comment: "This is a comment from\nthe parametrized file test-data.ts!" },
            { testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "07/06/2026", comment: "This is the second comment from\nthe parametrized file test-data.ts!"  },
            { testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "29/03/2026", comment: "This is a third and last comment from\nthe parametrized file test-data.ts!"  },
        ];
    }

}    