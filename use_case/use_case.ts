export interface UseCase<UseCaseInput, UseCaseOutput> {
  execute(input: UseCaseInput): UseCaseOutput
}

export interface UseCaseInput {}

export interface UseCaseOutput {}
