namespace MCDAPI.DTO.Mapper
{
    public class ContentMapper
    {
        public HomePageDto MapHomePage(UmbracoContentDto content)
        {
            return new HomePageDto
            {
                Name = content.Name,

                SliderHeading =
                    content.Properties["sliderHeading"]?.ToString(),

                SliderDescription =
                    content.Properties["sliderDescription"]?.ToString(),

                AboutUsText =
                    content.Properties["aboutUsText"]?.ToString()
            };
        }
    }
}
