namespace MCDAPI.DTO
{
    public class LanguageDto
    {
        public string IsoCode { get; set; } = default!;
        public string Name { get; set; } = default!;
        public bool IsDefault { get; set; }

        public string urlSegment { get; set; }
    }
}
