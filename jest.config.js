/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['dist'],
    resolver: 'jest-ts-webcompat-resolver',
    coveragePathIgnorePatterns: [
        'src/entities',
        'src/app.ts',
        'src/index.ts',
        'src/controller/user.controller/ user.controller.ts',
        'src/repository/userRepository/user.repository.ts',
    ],
};
