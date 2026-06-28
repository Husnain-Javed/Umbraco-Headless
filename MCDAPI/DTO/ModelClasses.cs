using System.Text.Json.Serialization;




public class UmbracoContentDto
{
    public string ContentType { get; set; }

    public string Name { get; set; }

    public Guid Id { get; set; }

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public RouteDto Route { get; set; }

    public Dictionary<string, object> Properties { get; set; }

    public Dictionary<string, CultureDto> Cultures { get; set; }

    public List<UmbracoContentDto> Children { get; set; }
}

public class UmbracoChildrenResponseDto
{
    [JsonPropertyName("total")]
    public int Total { get; set; }

    [JsonPropertyName("items")]
    public List<UmbracoContentDto>? Items { get; set; }
}
public class UmbracoContentTypeDto
{
    [JsonPropertyName("alias")]
    public string? Alias { get; set; }
}

public class UmbracoRouteDto
{
    [JsonPropertyName("path")]
    public string? Path { get; set; }

    [JsonPropertyName("startItem")]
    public UmbracoStartItemDto? StartItem { get; set; }
}

public class UmbracoStartItemDto
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("path")]
    public string? Path { get; set; }
}
public class RouteDto
{
    public string Path { get; set; }

    public string QueryString { get; set; }

    public StartItemDto StartItem { get; set; }
}


public class StartItemDto
{
    public Guid Id { get; set; }

    public string Path { get; set; }
}


public class CultureDto
{
    public string Path { get; set; }

    public string QueryString { get; set; }
}
public class DeliveryResponse
{
    public int Total { get; set; }
    public List<UmbracoContentItem> Items { get; set; }
}

public class UmbracoContentItem
{
    public string ContentType { get; set; }
    public string Name { get; set; }
    public Guid Id { get; set; }
    public Dictionary<string, object> Properties { get; set; }
}

public class SiteSettingsDto
{
    public string SiteName { get; set; }

    public NavigationDto MainNavigation { get; set; }

    public NavigationDto FooterNavigation { get; set; }
}
public class NavigationDto
{
    public List<NavigationItemDto> Items { get; set; }
}

public class NavigationItemDto
{
    public List<NavigationAreaDto> Areas { get; set; }

    public NavigationGroupDto Content { get; set; }
}

public class NavigationAreaDto
{
    public string Alias { get; set; }

    public List<NavigationItemDto> Items { get; set; }
}

public class NavigationGroupDto
{
    public string ContentType { get; set; }

    public string Title { get; set; }

    public List<LinkDto> Link { get; set; }

    public List<LinkDto> ChildLinks { get; set; }
}




public class LinkDto
{
    public string Title { get; set; }

    public string Target { get; set; }

    public string DestinationId { get; set; }

    public RouteDto Route { get; set; }
}




public class NavigationBlockGrid
{
    public int GridColumns { get; set; }

    public List<BlockItem> Items { get; set; }
}

public class BlockItem
{
    public List<BlockArea> Areas { get; set; }

    public NavigationArea Content { get; set; }
}
public class BlockArea
{
    public string Alias { get; set; }

    public List<BlockItem> Items { get; set; }
}
public class NavigationArea
{
    public string ContentType { get; set; }

    public Guid Id { get; set; }

    public NavigationProperties Properties { get; set; }
}


public class NavigationProperties
{
    public string Title { get; set; }

    public List<LinkDto> Link { get; set; }

    public List<LinkDto> ChildLinks { get; set; }
}

