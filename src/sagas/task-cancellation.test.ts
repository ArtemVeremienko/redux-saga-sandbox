import { createMockTask } from '@redux-saga/testing-utils';
import { describe, test, expect } from 'vitest'
import { cancel, fork, take } from 'redux-saga/effects';
import { $startBackgroundSync, $stopBackgroundSync, bgSync, watchBgSync } from './task-cancellation';

describe('watchBgSync', () => {
    const generator = watchBgSync();

    test('waits for start action', () => {
        const expectedYield = take($startBackgroundSync);
        expect(generator.next().value).toEqual(expectedYield);
    });

    test('forks the service', () => {
        const expectedYield = fork(bgSync);
        const mockedAction = $startBackgroundSync();
        expect(generator.next(true).value).toEqual(expectedYield);
    });

    test('waits for stop action and then cancels the service', () => {
        const mockTask = createMockTask();

        const expectedTakeYield = take($stopBackgroundSync);
        expect(generator.next(mockTask).value).toEqual(expectedTakeYield);

        const expectedCancelYield = cancel(mockTask);
        expect(generator.next().value).toEqual(expectedCancelYield);
    });
});