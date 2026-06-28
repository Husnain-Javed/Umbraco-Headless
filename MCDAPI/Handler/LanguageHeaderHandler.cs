public class LanguageHeaderHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LanguageHeaderHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var language = _httpContextAccessor
            .HttpContext?
            .Request
            .Headers["X-Language"]
            .FirstOrDefault();

        if (!string.IsNullOrEmpty(language))
        {
            request.Headers.TryAddWithoutValidation(
                "X-Language",
                language
            );
        }

        return await base.SendAsync(request, cancellationToken);
    }
}