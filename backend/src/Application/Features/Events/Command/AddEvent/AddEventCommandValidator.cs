using FluentValidation;

namespace Application.Features.Events.Command.AddEvent;

public class AddEventCommandValidator : AbstractValidator<AddEventCommand>
{
    public AddEventCommandValidator()
    {
        RuleFor(x => x.NameEvent)
            .NotEmpty().WithMessage("NameEvent is required")
            .MaximumLength(100).WithMessage("NameEvent must not exceed 100 characters");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Location is required")
            .MaximumLength(100).WithMessage("Location must not exceed 100 characters");

        RuleFor(x => x.DateEvent)
            .NotEmpty().WithMessage("DateEvent is required")
            .GreaterThan(DateTime.Now).WithMessage("DateEvent must be greater than the current date");

        RuleFor(x => x.Price)
            .NotEmpty().WithMessage("Price is required")
            .GreaterThan(0).WithMessage("Price must be greater than 0");
    }

}