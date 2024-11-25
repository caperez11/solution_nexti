# solution_nexti

# Procedimiento Almacenado `sp_delete_event`

Procedimiento almacenado para eliminar el evento pedido en la prueba


## Parámetros de Entrada
- `@str_id` (UNIQUEIDENTIFIER): ID del evento a eliminar.

## Parámetros de Salida
- `@int_o_cod_error` (INT OUTPUT): Código de error.
- `@str_o_error` (NVARCHAR(255) OUTPUT): Descripción del error.

## Ejemplo de Uso
```sql
DECLARE @o_cod_error INT, @o_error NVARCHAR(255);
EXEC sp_delete_event
     '00000000-0000-0000-0000-000000000000',
     @o_cod_error OUTPUT,
     @o_error OUTPUT;
SELECT @o_cod_error AS cod_error, @o_error AS error;
```

## Definición del Procedimiento
```tsql
IF OBJECT_ID('sp_delete_event', 'P') IS NOT NULL
    DROP PROCEDURE sp_delete_event;
GO
-- =====================================================================================--
-- Author:        Christian Pérez
-- Create date:   2024-11-24
-- Description:   Procedimiento almacenado para eliminar (desactivar) un evento por ID.
-- =======================================================================================--

CREATE PROCEDURE sp_delete_event @str_id UNIQUEIDENTIFIER,
                                 @int_o_cod_error INT OUTPUT,
                                 @str_o_error NVARCHAR(255) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Inicializar variables de salida
    SET @int_o_cod_error = 0;
    SET @str_o_error = N'[sp_delete_event] Operación exitosa';

    BEGIN TRY
        -- Validar parámetros de entrada
        IF @str_id IS NULL
            BEGIN
                SET @int_o_cod_error = 1;
                SET @str_o_error = N'[sp_delete_event] El ID del evento es requerido.';
                RETURN;
            END

        -- Verificar si el evento existe
        IF NOT EXISTS (SELECT 1 FROM db_solution.dbo.events WHERE id = @str_id)
            BEGIN
                SET @int_o_cod_error = 2; -- Error 2: Evento no existe
                SET @str_o_error = N'[sp_delete_event] El evento con el ID proporcionado no existe.';
                RETURN;
            END

        -- Verificar si el evento ya está marcado como eliminado
        IF EXISTS (SELECT 1 FROM db_solution.dbo.events WHERE id = @str_id AND status = 0)
            BEGIN
                SET @int_o_cod_error = 3; -- Error 3: Evento ya eliminado
                SET @str_o_error =
                        N'[sp_delete_event] El evento con el ID proporcionado ya fue eliminado anteriormente.';
                RETURN;
            END

        -- Actualizar estado a false (0)
        BEGIN TRANSACTION;
        BEGIN TRY
            UPDATE db_solution.dbo.events
            SET status = 0
            WHERE id = @str_id;

            -- Confirmar la transacción si no hay errores
            COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
            -- Manejo de errores y rollback de la transacción
            IF @@TRANCOUNT > 0
                BEGIN
                    ROLLBACK TRANSACTION;
                END

            SET @int_o_cod_error = ERROR_NUMBER();
            SET @str_o_error = ERROR_MESSAGE();
            RETURN;
        END CATCH

    END TRY
    BEGIN CATCH
        -- Manejo de errores generales que no requieren transacción
        SET @int_o_cod_error = ERROR_NUMBER();
        SET @str_o_error = ERROR_MESSAGE();
    END CATCH
END;
GO
```
