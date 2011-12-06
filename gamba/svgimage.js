function Tool(name, icon_url) {
    this.name = name
    this.icon = $("<img />")
    this.icon.attr({
        src: icon_url,
        width: "30px",
        height: "30px",
    })
    this.element = $("<div />")
    this.element.addClass("tool")
    this.element.append(this.icon)
    $("div#toolbar").append(this.element)
}

function ClickableTool(name, icon_url, handler) {
    Tool.call(this, name, icon_url)
    this.element.click(handler)
}

function SelectableTool(name, icon_url, select, unselect) {
    Tool.call(this, name, icon_url)
    this.select = function() {
        jQuery.each(tools, function(index, tool) {
            if (tool.element.hasClass("selected"))
                tool.unselect()
        })
        $(this).addClass("selected")
        select()
    }
    this.unselect = function() {
        this.element.removeClass("selected")
        unselect()
    }
    this.element.click(this.select)
}

$(document).ready(function() {
    var svg_image = $("svg#svgimage")
    var svg_image_width = svg_image[0].offsetWidth
    svg_image.css({
        width: svg_image_width - 30,
    })
    tools = []
    var add_tool = new ClickableTool(
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
                    var tool = new SelectableTool(
                        name = tool_object.name,
                        icon_url = tool_object.icon,
                        select = tool_object.select,
                        unselect = tool_object.unselect
                    )
                    tools.push(tool)
                })
            })
        }
    )
})
