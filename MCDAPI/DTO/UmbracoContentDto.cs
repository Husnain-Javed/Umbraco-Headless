namespace MCDAPI.DTO
{
    public class UmbracoContentDto
    {
        public string ContentType { get; set; }

        public string Name { get; set; }

        public Guid Id { get; set; }

        public Dictionary<string, object> Properties { get; set; }
    }
}
