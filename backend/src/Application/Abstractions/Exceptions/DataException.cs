namespace Application.Abstractions.Exceptions;

public sealed class DataException(string message, Exception innerException) : Exception(message, innerException);