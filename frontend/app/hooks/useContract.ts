'use client';

import {useCallback, useState} from 'react'
import {useReadContract, useSimulateContract, useWatchContractEvent, useWriteContract} from 'wagmi';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '@/types/contract';

type UseContractType = {
  functionName: any,
  eventName?: any,
  args?: any
};

export function useContract(param: UseContractType) {
  // State for input values
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isWatching, setIsWatching] = useState(false);

  const {functionName, eventName, args = []} = param;

  // Read contract data
  const {data: readData, refetch, isError: readError, error: readErrorMsg} = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName,
    args,
  });

  // Contract write hooks
  const {writeContract, isPending: isWritePending} = useWriteContract();

  // Simulation hook
  const {data: simulateData, error: simulateError} = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName,
    args,
  });

  // Watch events - always call the hook but only enable when eventName is provided
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    eventName: eventName || '', // Provide a default value
    onLogs: () => {
      if (eventName) { // Only update state if event watching is desired
        setIsWatching(true)
        refetch()
      }
    },
    onError: () => {
      if (eventName) {
        setIsWatching(false)
      }
    },
    enabled: !!eventName // Disable the hook when no eventName is provided
  });

  // Handle input change
  const handleInputChange = useCallback((functionName: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [functionName]: value
    }))
  }, []);

  // Generic write function
  const handleWrite = useCallback(async (args?: unknown[]) => {
    try {
      if (simulateError) {
        throw new Error(`Simulation failed: ${simulateError.message}`)
      }

      if (simulateData?.request) {
        const hash = await writeContract(simulateData.request)
        return {hash, error: null}
      }

      throw new Error('Simulation request failed')
    } catch (error) {
      return {hash: null, error: error instanceof Error ? error : new Error('Unknown error')}
    }
  }, [simulateData, simulateError, writeContract]);

  // Helper function to get input value
  const getInputValue = useCallback((functionName: string) => {
    return inputValues[functionName] || ''
  }, [inputValues]);

  // Helper function to parse input based on type
  const parseInput = useCallback((value: string, type: 'bigint' | 'string' | 'number') => {
    switch (type) {
      case 'bigint':
        return BigInt(value)
      case 'number':
        return Number(value)
      default:
        return value
    }
  }, []);

  return {
    // State
    readData,
    readError,
    readErrorMsg,
    inputValues,
    isWritePending,
    isWatching,

    // Actions
    handleInputChange,
    getInputValue,
    parseInput,
    handleWrite,
    refetch,
  }
}
