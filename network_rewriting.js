function stBootstrapNetworkRewriting() {
    if (!window.sensor_tower_artifacts) {
        console.warn("Sensor Tower: Missing artifact list.");
        window.sensor_tower_artifacts = [];
    }

    var namespace = window.st_network_rewriting = {};

    // Get notified on all DOM mutations
    var options = {
        attributes: true,
        childList: true,
        subtree: true
    }

    var mutationCallback = function(records, observer) {
        records.forEach( record => {
            if (record.type == "childList") {
                record.addedNodes.forEach ( node => {
                    if (node.tagName == "STYLE") {
                        parseStyleSheet(node.sheet);
                    }
                    if (node.hasAttribute && node.hasAttribute("src")) {
                        let newSrc = overrideForUrl(node.getAttribute("src"), false);
                        if (newSrc != null) {
                            node.setAttribute("src", newSrc);
                        }
                    }
                })
            } else if (record.type == "attributes") {
                handleAttributesMutation(record.target, record.attributeName);
            }
        });
    }

    function handleAttributesMutation(node, attributeName) {
        if (attributeName == "src") {
            let newSrc = overrideForUrl(node.getAttribute("src"), false);
            if (newSrc != null) {
                node.setAttribute("src", newSrc);
            }
        }
    }

    function parseStyleSheet(styleSheet) {
        artifacts = window.sensor_tower_artifacts;

        let rules = styleSheet.rules;
        for(var index = 0; index < rules.length; index += 1) {
            let rule = rules[index]
            if (!rule.style) { continue; }
            if (!rule.style.backgroundImage) { continue; }
            if (rule.style.backgroundImage == "none") { continue; }
            let newValue = overrideForUrl(rule.style.backgroundImage, true);
            if (newValue != null) {
                rule.style.backgroundImage = newValue;
            }
        }
    }

    function overrideForUrl(url, useRegex) {
        if (!useRegex) {
            try {
                const targetUrl = new URL(url);
                const currentUrl = new URL(location.href);
                if (targetUrl.host != currentUrl.host) {
                    return null;
                }
            } catch (error) {
                // Failed to parse absolute URL. We don't need to check host for relative paths.
            }
        }
        var replacementUrl = null;
        artifacts = window.sensor_tower_artifacts;

        var path;
        try {
            const uri = new URL(url);
            path = uri.pathname.split("/");
        } catch (error) {
            path = url.split("/");
        }

        var lastPathComponent = path[path.length - 1];
        if (lastPathComponent == "mraid.js") {
            replacementUrl = "https://adbl0ck.s3.us-west-1.amazonaws.com/injected_javascript/mraid.js";
        } else if (lastPathComponent == "dapi.js") {
            replacementUrl = "https://adbl0ck.s3.us-west-1.amazonaws.com/injected_javascript/dapi.js";
        }

        if (!replacementUrl) {
            for(var artifactIndex = 0; artifactIndex < artifacts.length; artifactIndex += 1) {
                var artifact = artifacts[artifactIndex];
                if (artifact[0] == '/') {
                    artifact = artifact.substr(1);
                }

                if (useRegex) {
                    let regex = new RegExp(artifact, 'i')
                    let newValue = url.replace(regex, artifact);
                    if (newValue != url) {
                        replacementUrl = newValue;
                        break;
                    }
                } else if (url.toLowerCase().endsWith(artifact.toLowerCase()) && url != artifact) {
                    replacementUrl = artifact;
                    break;
                }
            }
        }

        if (!replacementUrl) {
            return null;
        }

        if (url == replacementUrl) {
            return null;
        }

        return replacementUrl;
    }

    var observer = new MutationObserver(mutationCallback);

    if (document.documentElement) {
        observer.observe(document.documentElement, options);
    }
    

    // Intercept AJAX

    var xhr_open_original = window.XMLHttpRequest.prototype.open;
    function intercept_xhr_open(method, url, async, username, password) {
        let newUrl = overrideForUrl(url, false);
        if (newUrl != null) {
            arguments[1] = newUrl;
        }
        xhr_open_original.apply(this, arguments);
    }
    window.XMLHttpRequest.prototype.open = intercept_xhr_open;

    function injectScriptNamed(name) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://adbl0ck.s3.us-west-1.amazonaws.com/injected_javascript/${name}.js`;
        document.head.appendChild(script);
    }

    function detectPlayableLibraries() {
        if (typeof window.dapi != "undefined") {
            injectScriptNamed("dapi");
        }

        if (typeof window.mraid != "undefined") {
            injectScriptNamed("mraid");
        }
    }

    function listenForPageNavigation() {
        window.addEventListener('DOMContentLoaded', function () {
            setTimeout(function () {
                window.addEventListener("beforeunload", function() {
                    console.log("Page is navigating away.")
                    window.st_showNavigationBanner();
                    return true;
                });
            }, 2000);
        });
    }

    window.st_showNavigationBanner = function() {
        if (document.getElementById("st_navigation_banner")) {
            return;
        }

        var banner = document.createElement("div");
        banner.id = "st_navigation_banner";
        banner.style.position = "fixed";
        banner.style.top = "-20vh";
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.height = "20vh";
        banner.style.backgroundColor = "#3fa887";
        banner.style.color = "white";
        banner.style.fontSize = "larger";
        banner.style.display = "flex";
        banner.style.justifyContent = "center";
        banner.style.alignItems = "center";
        banner.style.zIndex = "9999999";
        banner.style.boxShadow = "0 0 5px rgb(0,0,0,0.6)";
        
        banner.textContent = "The page attempted to navigate away.";
        document.body.appendChild(banner);
        banner.animate([{ top: "0" }], {
            duration: 500,
            fill: "forwards"
        });
    }

    listenForPageNavigation();

    namespace.runOnPageLoadHasRun = false;
    function runOnPageLoad() {
        if(namespace.runOnPageLoadHasRun) {
            return;
        }

        namespace.runOnPageLoadHasRun = true;

        detectPlayableLibraries();
    }

    window.addEventListener('load', runOnPageLoad);
    
    // workaround for document.open clearing event listeners
    // specifically `al_renderHtml` from AppLovin using this method
    window.documentOpenOriginal = document.open;
    document.open = function() {
        window.documentOpenOriginal.apply(this, arguments);

        if (namespace.runOnPageLoadHasRun) {
            return;
        }

        window.addEventListener('load', runOnPageLoad);
    }
}

stBootstrapNetworkRewriting();