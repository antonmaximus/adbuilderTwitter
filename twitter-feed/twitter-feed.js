define(['comp/graphicComp', 'utils/domUtils', 'utils/objectUtils'],

    function(graphicComp, domUtils, objectUtils) {

        'use strict';

        var _templates = {
            imagePlaceHolder: '<div id="sz-placeholderImage" style="width: 100%; height: 100%; background:  url(<%=image %>); background-size: cover; cursor: pointer;"></div>',
            twitterLoader: '<a class="twitter-timeline" href="#" data-widget-id="<%=widgetId %>" data-screen-name="<%=screenName %>" data-chrome="" data-tweet-limit="" style="display: block;  height: 100%; width: 100%; background: url(data:image/gif;base64,R0lGODlhMgAyAIQfAE9PT+Pj48vLy/z8/PHx8dbW1vj4+M/Pz+rq6t3d3fX19e7u7tLS0uDg4NnZ2efn55mZmVdXV3FxccnJyV9fX7CwsISEhNXV1WhoaLy8vHp6eo+Pj6SkpPf398jIyP///yH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggR0lNUCBvbiBhIE1hYwAh+QQJCgAfACwAAAAAMgAyAAAFteAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/z0AEAYAQIang6dUPJKWQ4+nQGo+pUjsqFjSRr1WkfSAFEM/4Y8XWdBShOaf9Bw3rdV3WWAuiM3pNgJzLm1SVDyDLIllKgiMj5Awf38vk4uSloctlh5kkZ+gXYAoeTmUipc3py4Jc542rlcnHn0jqzR5Xme5ozhSCXV4vT17u3SlPWt3yDqXyx7AQM92w9LVkQ7Xodvc3d7f4OHi4iEAIfkECQoAHwAsAAAAADIAMgAABbDgJ45kaZ5oqq5s675wLM90bd94ru987/89DxDmEQ5PB+OoaAJUhsUCiUkCWI9UUVZ0xWa3VspRqwQDxqICNTnqBrcfOPc8lccCRY8gllfeBHkualFvfimBaCoIiYyNLX19L5CIfJNSLpMeB46cnUuGKHY4kSykOaYtCXmbN6t1J3p1opKgX58mszVFCWSfoD54ZX65OltwxK3GhrtQy7W/zZ4lDtDS1tfY2drb3N1HIQAh+QQJCgAfACwAAAAAMgAyAAAFreAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/z0PEOYRDk8H46hoUv6KBRJTOgVWP1es81m9Fg9HUdeZBRamyeVWlLkVt2VtCUC/Bd6CGL2eE7xdEnsSQXEme2GIiYqEb38ujY0zkFAvkx5gi5maJYWcazmRLKGgji4Jb5g2qFQnHnlqnY9rXWpNn24eCWJKpUN3vGS3PF5wwqTBnrpWxbaZsYoOxpvT1NXW19jZ2tohACH5BAkKAB8ALAAAAAAyADIAAAWs4CeOZGmeaKqubOu+cCzPdG3feK7vfO//PQ8Q5hEOTwfjqGhS/ooFElM6BVY/V6zzWb0WD0dR15kFFqbJ5VZX3Ja1pfYt0BbE2muaQN46Q4NvTYFhJAiEh4hEeHwtAI6PjjOLfy6QjxSJmZqCLYM2eJ2MOKAvCW1gN6dUJx52ap6hnGJqsjxFCWJKokB0umR5gKvCVl5uHrjEcWuwwZslDsDO0tPU1dbX2NnOIQAh+QQJCgAfACwAAAAAMgAyAAAFr+AnjmRpnmiqrmzrvnAsz3Rt33iu73zv/z0PEOYRDk8H46hoUv6KBRJTOgVWP1es81m9Fg9HUdeZBRamyeVWV9yWtaX2LdAWxNprmkDeOkODb02BYSQIhIeIRHh8LYuMiotRLo4eYImXmHF5JgAAXIMknZ07eDAWohQ4bZZieR52I6KeNmVdapyzPEUJrWqbPHRKXr+kZG7EqsOavFbHgpegiA7ImdXW19jZ2tvc2yEAIfkECQoAHwAsAAAAADIAMgAABa7gJ45kaZ5oqq5s675wLM90bd94ru987/89DxDmEQ5PB+OoaFL+igUSUzoFVj9XrPNZvRYPR1HXmQUWpsnlVlfclrWl9i3QFsTaa5pA3jpDg29NgWEkCISHiER4fC2LjIqLUS6OHmCJl5hxeYJcg1Sed48sCW2WNqVUJwARn5svZV0jAACcgAliSrO0YXRKV7OEXk4QwEOPWbMWxm5rxYighw6umdTV1tfY2drb3CEAIfkECQoAHwAsAAAAADIAMgAABbDgJ45kaZ5oqq5s675wLM90bd94ru987/89DxDmEQ5PB+OoaFL+igUSUzoFVj9XrPNZvRYPR1HXmQUWpsnlVlfclrWl9i3QFsTaa5pA3jpDg29NgWEkCISHiER4fC2LjIqLUS6OHmCJl5hxeYJcg1Sed48sCW2WNqVUJx52aqAsZVUAapyACSIAABBirjh0Sri6u4RXwKlDj8VqtlZbuLSIyZkjGrLS1tfY2drb3N3cIQAh+QQJCgAfACwAAAAAMgAyAAAFsOAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/z0PEOYRDk8H46hoUv6KBRJTOgVWP1es81m9Fg9HUdeZBRamyeVWV9yWtaX2LdAWxNprmkDeOkODb02BYSQIhIeIRHh8LYuMiotRLo4eYImXmHF5glyDVJ53jywJbZY2pSQAACcedmqgLGWqS2qcPaoWYkqiPxCzulSEv8DBQ6qrtVQJxsjJxYiwhA6bmdXW19jZ2tvc3R8hACH5BAkKAB8ALAAAAAAyADIAAAWw4CeOZGmeaKqubOu+cCzPdG3feK7vfO//PQ8Q5hEOTwfjqGhS/ooFElM6BVY/V6zzWb0WD0dR15kFFqbJ5VZX3Ja1pfYt0BbE2muaQN46Q4NvTYFhJAiEh4hEeHwti4yKi1Eujh5giZeYJQAAjXk4m5udgzKgnC8JbZY2oBRUJx52aqMtoXFKt2uzM0UJYriePHS4rmFebsA5j1m8Q8u5yD66hA7QmdbX2Nna29zd3CEAIfkECQoAHwAsAAAAADIAMgAABazgJ45kaZ5oqq5s675wLM90bd94ru987/89DxDmEQ5PB+OoaFL+igUSUzoFVj9XrPNZvRYPR1HXmQUWpsnlVlfclrWl9i3QFsTaa5pA3jpDg29NgWEkCISHiDAAi4yLL3h4M42MEo+QHmCJmptxeYJcg1Shd3wuCW2ZNqhUJx52aqMsZV1qn4AJYkqlQ3S6ZJ48Xm7AObtZRbhWw7aIsYQOxJzS09TV1tfY2dkhACH5BAkKAB8ALAAAAAAyADIAAAWv4CeOZGmeaKqubOu+cCzPdG3feK7vfO//PQ8Q5hEOTwfjqGhS/ooFElM6BVY/V6zzWb0WD0dR15nNbUyFaXK51QHepbI2LodB3oBIrFiXRfAQLWlQPXgtfGEsCImMjUR8kC+QkTKThC6WHmCOnJ10h205lCujOKUsCXybNqpUJx4CVH2YbV1sTaE3RQliSohhAWOuYV5bs6bFdLxWxrW5zJ4mDs/R1dbX2Nna29yeIQAh+QQBCgAfACwAAAAAMgAyAAAFsOAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/z0PEOYRDk8UQKloMgIBAAmJOaU+lSOrSPuDYj/a4uEogmadYPRQYv4cnFxdUd1eque3wFwQm6trAngtBXMFQXEngmQqCIuOj0R+iiySky+VHoYumGOQnp92LYg4fqKWNqUvCXOdqGJViXxno5d/VnC2f6QeCVu4uj16uLBkYXfAcsZ2vUBccbQ/0I8OyKDW19jZ2tvc3d4hADs=) no-repeat center;"></a>'   
        };
           
        var SIZMEK_WIDGET_ID = '654008050769072128'; 
            
        var TWITTER_JS_TAG = '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");'


        function FacebookFeedComp(properties) {
            graphicComp.call(this, properties);    
        }

        FacebookFeedComp.prototype = new graphicComp();

        FacebookFeedComp.prototype.internalDraw = function() {
            graphicComp.prototype.internalDraw.call(this);

            // Use placeholder image until user clicks on it.
            this.div.innerHTML = buildTemplate.call(this, _templates.imagePlaceHolder, {
                image: this.prop.placeholderImage
            });
            domUtils.bindEvent(this.div, 'click', function() {
                drawTwitterFeed.call(this);
            }.bind(this));
        };


        function drawTwitterFeed() {
            var cleanedScreenName = (this.prop.twitterScreenName[0] == '@' ? this.prop.twitterScreenName.slice(1) : this.prop.twitterScreenName);

            this.div.innerHTML = buildTemplate.call(this, _templates.twitterLoader, {
                widgetId: this.prop.twitterWidgetId || SIZMEK_WIDGET_ID,
                screenName: this.prop.twitterWidgetId == '' ?  cleanedScreenName : ''
            });

            // Inject Twitter Script
            var script = document.createElement('script');
            var payload = TWITTER_JS_TAG;
            script[(script.innerText===undefined?"textContent":"innerText")] = payload;
            document.documentElement.appendChild(script);
        }
    
        FacebookFeedComp.getInputSchema = function(){
            return FacebookFeedComp.inputSchema;
        };

        FacebookFeedComp.inputSchema = objectUtils.create(graphicComp.inputSchema,{
            placeholderImage: 'asset',
            twitterScreenName: 'string',
            twitterWidgetId: 'string',
        });

        function buildTemplate(str, data){
            return str.replace(/<%=.+? %>/g, function(token){
                var key = token.substring(3, token.length-3);
                return data[key];
            });
        }

        return FacebookFeedComp;
    }
);
