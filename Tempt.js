(Tempt = function() {
    var scripts = document.getElementsByTagName('script');
    var thisScriptTag = scripts[scripts.length - 1];
    var vars = JSON.parse(thisScriptTag.innerHTML);
    var html = document.getElementsByTagName('html')[0];
    var templatePath = '/templates'
    var doVars = function() {
        html.innerHTML = html.innerHTML.replace(/{{(.*?)}}/g, function(match, matchGroup) {
        	var key = matchGroup.trim();
            if(vars.hasOwnProperty(key)){return vars[key]} else console.error('No such variable',key);
            return key;
        });
    };
    var doIncludes = function() {
        var matches = false;
        html.innerHTML = html.innerHTML.replace(/{%(.*?)%}/g, function(match, matchGroup) {
            xmlhttp = new XMLHttpRequest();
            matches = true;
            xmlhttp.open("GET", templatePath+'/'+matchGroup.trim() + ".html", false);
            xmlhttp.send(null);
            if (xmlhttp.status == 200) {
                return xmlhttp.responseText;
            }else{
                console.error('No such template',matchGroup);
                return '';
            }
        });
        if (matches) {
            doIncludes();
            doVars();
        };
    };
    doIncludes();
    return '0.0.1';
})();