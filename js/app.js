$(document).ready(function () {
    $('form#search').submit(function (event) {
        event.preventDefault();

        var url = "http://localhost:9080/crawl.json";

        var links = $('ul#links');
        var word = $('input#word');
        var msg = $("p#msg");

        if (word.val() === "") {
            msg.html("需要写入一个关键字哦");
            return;
        }


        links.empty();

        msg.html("正在查找中.....");
        $.get(
            url,
            {
                spider_name: 'zhidao',
                url: "http://zhidao.baidu.com/search?word=" + encodeURI(word.val() + " " + "百度云")
            },
            function (data) {
                var items = data.items;

                items.forEach(function (item) {
                    if (item.pwd) {
                        var link_node = $("<li>链接:<a href='" + item.link + "'>" + item.link + "</a> 密码:" + item.pwd + "</li>");
                    } else {
                        var link_node = $("<li>链接:<a href='" + item.link + "'>" + item.link + "</a></li>");
                    }
                    link_node.appendTo(links);
                    console.log(item);
                });

                msg.html("");
            }
        );
    });
});
