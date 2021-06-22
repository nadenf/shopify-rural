// ==UserScript==
// @name        Shopify Rural
// @namespace   lashjungle
// @version     1.0.1
// @description Shows the Rural flag within Shopify
// @author      Nadenf
// @match       https://dailey-dose-of-lashes.myshopify.com/admin/orders/*
// @grant       none
// @require     http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

$(function() {
  run();
});

function run() {
    const wait = async selector => {
        while (Object.keys($("a:contains('View map')")).length == 2) {
            await new Promise( resolve => requestAnimationFrame(resolve) )
        }
        return;
    };

    wait().then(() => {
        const text = $("a:contains('View map')").parent().parent().find("p").text();

        const rural = [
            "2264-2281", "2311-2484", "2487-2499", "2533-2554", "2575-2599", "2621-2639", "2642-2647", "2649-2707", "2710-2714", "2716", "2720-2730", "2787-2879",
            "2648", "2715", "2717-2719", "2731-2739", "3221-3334", "3342-3349", "3351-3352", "3357-3426", "3444-3688", "3691-3749", "3812-3909", "3921-3925", "3945-3974", "3979", "3984-3999",
            "4309-4453", "4580-4693", "4454-4499", "4694-4802", "4804-4805", "9920-9960", "4803", "4806-4999", "9961-9998",
            "2880-2889", "5201-5749",
            "6215-6700", "6701-6797",
            "800-802", "804-821", "828-851", "853-853", "860-861", "870-871", "873-879", "906-999", "803-803", "822-827", "852-852", "854-859", "862-869", "872-872", "880-905",
            "6798-6799", "2898-2899", "7151-7154"
        ];

        var ruralExpanded = [];
        rural.forEach(element => {
            if (element.includes("-")) {
                const dashIdx = element.indexOf("-");
                for (let i = parseInt(element.substring(0, dashIdx)); i <= parseInt(element.substring(dashIdx+1, element.length)); i++) {
                    ruralExpanded.push("" + i);
                }
            }else{
                ruralExpanded.push(element);
            }
        })

        const spacePos = text.indexOf(" ", text.indexOf("Australia")-5);
        const postCode = text.substring(spacePos, text.indexOf("Australia")).trim();

        if (ruralExpanded.includes(postCode)) {
            $('.lashjungle-rural').remove();
            $("a:contains('View map')").parent().parent().find("p").append("<div class='lashjungle-rural' style='border-radius: 2px; background-color: #FF6347; color: white; width: 100%; margin-top: 10px; padding-left: 5px; width:55px'>RURAL</div>");
        }
    });

   requestAnimationFrame(run);
}

requestAnimationFrame(run);
