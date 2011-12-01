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
    var add_tool = new Tool(
        name = "Add tool",
        icon_url = "images/kcontrol-3.png",
        handler = function() {
            jQuery.window({
                title: "Add tool",
                icon: "images/kcontrol-3.png",
                content: $("div#add_tool").html(),
                minimizable: false,
                maximizable: false,
            })
            $("button#add_tool_button").click(function() {
                var path = $("input#tool_path")[1].value
                jQuery.get(path, function(tool_text) {
                    var tool_object = eval("(" + tool_text + ")")
                    var tool = new Tool(
                        name = tool_object.name,
                        icon_url = tool_object.icon,
                        handler = tool_object.handler
                    )
                })
            })
        }
    )
})
