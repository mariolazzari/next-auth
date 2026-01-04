export type PostgresError = {
  code: string;
};

export function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  );
}

export function isUniqueViolation(error: unknown): boolean {
  return (
    (isPostgresError(error) && error.code === "23505") ||
    (error instanceof Error &&
      isPostgresError(error.cause) &&
      error.cause.code === "23505")
  );
}
