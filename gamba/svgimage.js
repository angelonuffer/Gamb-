function Tool(name, icon_url, handler) {
    this.name = name
    this.icon = $("<img />")
    this.icon.attr({
        src: icon_url,
        width: "30px",
        height: "30px",
    })
    this.element = $("<div />")
    this.element.append(this.icon)
    this.element.css({
        cursor: "pointer",
    })
    this.element.click(handler)
    $("div#toolbar").append(this.element)
}


$(document).ready(function() {
    var svg_image = $("svg#svgimage")
    var svg_image_width = svg_image[0].offsetWidth
    svg_image.css({
        width: svg_image_width - 30,
    })
    var manage_tools = new Tool(
        name = "Manage tools",
        icon_url = "images/kcontrol-3.png",
        handler = function() {
        }
    )
})
