function Action(name, handler) {
    var self = this
    self.element = $("<button />").text(name)
    self.element.button()
    self.element.click(handler)
}

function Tool(name, icon_url) {
    var self = this
    self.name = name
    self.icon = $("<img />")
    self.icon.attr({
        src: icon_url,
        width: "30px",
        height: "30px",
    })
    self.element = $("<div />")
    self.element.addClass("tool")
    self.element.append(self.icon)
    self.menu = $("<div />")
    var remove_action = new Action(
        name = "remove",
        handler = function() {
            self.element.remove()
        }
    )
    self.menu.append(remove_action.element)
    self.menu.hide()
    $(document.body).append(self.menu)
    $(document).click(function() {
        self.menu.hide()
    })
    self.element.contextmenu(function() {
        self.menu.css({
            position: "absolute",
            left: event.pageX,
            top: event.pageY
        }).show()
        return false
    })
    $("div#toolbar").append(self.element)
}

function ClickableTool(name, icon_url, handler) {
    var self = this
    Tool.call(self, name, icon_url)
    self.element.click(handler)
}

function SelectableTool(name, icon_url, select, unselect) {
    var self = this
    Tool.call(self, name, icon_url)
    self.select = function() {
        jQuery.each(tools, function(index, tool) {
            if (tool.element.hasClass("selected"))
                tool.unselect()
        })
        self.element.addClass("selected")
        select()
    }
    self.unselect = function() {
        self.element.removeClass("selected")
        unselect()
    }
    self.element.click(self.select)
}

$(document).ready(function() {
    var svg_image = $("svg#svgimage")
    var svg_image_width = svg_image[0].offsetWidth
    svg_image.css({
        width: svg_image_width - 30,
    })
    var add_tool_action = function() {
        var path = $("input#tool_path")[0].value
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
    }
    $("button#add_tool_button").click(add_tool_action)
    $("input#tool_path").keyup(function() {
        if (event.keyCode == 13)
        {
            add_tool_action()
        }
    })
    tools = []
    var add_tool = new ClickableTool(
        name = "Add tool",
        icon_url = "images/kcontrol-3.png",
        handler = function() {
            $("div#add_tool").dialog({
                title: "Add tool",
                show: "blind",
                hide: "blind"
            })
        }
    )
    add_tool.menu = $("<div />")
})
