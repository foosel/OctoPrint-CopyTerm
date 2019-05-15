$(function() {
    function CopyTermViewModel(parameters) {
        var self = this;

        self.terminalViewModel = parameters[0];

        self.copy = function() {
            console.log("Copy clicked");

            var selection = window.getSelection();
            var text = selection.toString();
            var lines;

            if (text.length === 0) {
                // nothing selected
                if (self.terminalViewModel.fancyFunctionality()) {
                    lines = _.map(self.terminalViewModel.log(), "line");
                } else {
                    lines = self.terminalViewModel.plainLogLines();
                }
            } else {
                var node = selection.anchorNode;
                while (node.id !== "terminal-output") {
                    node = node.parentNode;
                    if (node.nodeName === "BODY") {
                        return;
                    }
                }

                // if we made it to here then the selection was within the terminal output
                lines = text.replace(/Recv:/g, "\nRecv:").replace(/Send:/g, "\nSend:").trim().split("\n");
            }

            lines = _.filter(lines, function(line) { return line.trim() !== "" });
            lines = _.map(lines, function(line) { return line.replace(/Recv: /g, "").replace(/Send: /g, "") });

            copyToClipboard(lines.join("\n"))
        };

        self.onStartup = function() {
            var element = $("<a href='javascript:void(0)'><i class='fa fa-copy'></i> Copy prefixless</a>");
            element.click(self.copy);
            $("#term .terminal .pull-right").prepend(element);
        }

    }

    // view model class, parameters for constructor, container to bind to
    ADDITIONAL_VIEWMODELS.push([CopyTermViewModel, ["terminalViewModel"], []]);
});
