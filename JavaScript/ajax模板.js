	

	//接受数据并显示
	//key1:,key2:
		$.ajax({
			url : 'showSCw',//阿彪servlet调用的名字
			type : 'GET',//一般用GET，密码什么比较保密的用POST
			success : function(data){//data时阿彪传过来的参数，json形式的数组字符串'{"list"：[{"key1":"val1","ket2":"val2","key3","val3"}，{"key1":"val1","ket2":"val2","key3","val3"}，{"key1":"val1","ket2":"val2","key3","val3"}]}'
				var jsonArray = JSON.parse(data).list;
				var outStr  = "";//要打印到页面的数据
				var outStr2 = "";
				$.each(jsonArray,function(i,value){
					var jsonCell = value;//指的是{"key1":"val1","key2":"val2","key3":"val3"}
					outStr += ;//利用jsonCell.key1，jsonCell.key2,jsonCell.key3调用函数，并加入到要输出的html段落中
				});
				$("#position").html(outStr);//最后，打印出来
				$("#position2").html(outStr2);

			},
			error : function(){
				console.log("服务器被天狗吃掉了，获取数据失败~");
			}
		});



	//发送数据
		var json = {};//新建一个json对象
		json.key1 = $("postion1").val();
		json.key2 = $("postion2").text();
		json.key3 = $("postion2").val();

		$.ajax({
			url : 'aaa',
			type : 'GET',
			data ： json,
			success : function(){
				console.log("成功更新数据~")
			},
			error : function(){
				console.log("服务器连接失败，数据更新失败")
			}
		})

			// 提交评论传给后台数据
        $('#pjsubmit').click(function(){
            var courseid=1;
            var score = $('#score strong').html().replace('分','').trim(); //replace函数用空来代替分
            var content = $('#pjtext').val();
            console.log(score,content);
            $.ajax({
                url:'',
                type:'GET',
                data:{
                    score:score,
                    content:content,
                    courseid:courseid
                },
                success:function(){
                    console.log("传输成功");
                },
                error:function(error){
                    console.log("未传输成功");
                }
            })
            return false;
        })


//获取当前页面的url,并发给服务器
        var canshu = window.location.search;
        canshu = canshu.split("?");
        canshu = canshu[1].split("=");
        canshu = canshu[1];
        var json = {};
        json.parameter = canshu;
        $.ajax({
            url : 'aaa',
            type : 'GET',
            data : json,
            success : function(){
                console.log("成功~")
            },
            error : function(){
                console.log("服务器连接失败，数据更新失败")
            }
        });



{
	"course_grade":5,
	"course_title":"title",
	"course_watch":52,
	"videos":[
		{
			"id":1,
			"order":1,
			"videos":{  "1.3":"8:21"  ,  "1.2":"6:21"  ,  "1.1":"4:21"  },
			"name":"章节1",
			"course_id":"1"
		},
		{
			"id":2,
			"order":2,
			"videos":{  "2.1":"4:21"  ,  "2.3":"8:21"  ,  "2.2":"6:21"  },
			"name":"章节2",
			"course_id":"1"
		}
		],
	"course_redirect":"redirec",
	"course_pic":"pic",
	"course_class":"class",
	"course_id":"1",
	"course_type":"type"
}

//grade 评分  难度系数写死

{
	"course_grade":5,
	"course_introduce":"introduce",
	"course_title":"title",
	"course_watch":52,
	"videos":[
		{
			"id":1,
			"order":1,
			"videos":{"1.3":"8:21","1.2":"6:21","1.1":"4:21"},
			"name":"章1",
			"course_id":"1"
		},
		{
			"id":2,
			"order":2,
			"videos":{"2.1":"4:21","2.3":"8:21","2.2":"6:21"},
			"name":"章2",
			"course_id":"1"
		}
		],
//筛选处类型
	"course_redirect":"redirec",
	"course_class":"class",
	"course_type":"type",

	"course_pic":"pic",
	"course_id":"1",
	"comments":[
		{
			"content":"ceshi",
			"id":"1",
			"userID":1,
			"username":"user",
			"time":"2017-04-26 11:21:02",
			"grade":6,
			"courseId":"1",
			"head":"2.jpg"
		},
		{
			"content":"654978",
			"id":"2",
			"userID":2,
			"username":"user2",
			"time":"2017-04-26 11:20:02",
			"grade":10,
			"courseId":"1",
			"head":"3.jpg"
		}
		]
}





dstz.jsp?iddstz=1

// 导航栏new
 	<div id="nav">
        <div id="daohang">
            <a href="index.jsp">
                <span class="am-icon-home" style="color:#fff;font-size:30px;"></span>
            </a>
        </div>
        <div id="user" class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="user_saveFileName">
                
            </a>
            <ul class="dropdown-menu  pull-right">
				<li  id="user_nickName">
					
				</li>
				<li><a href="quitServlet">退出</a></li>
			</ul>
        </div>
        <div id="searchcorn">
            <span class="am-icon-search am-icon-sm"></span>
        </div>
        <form>
            <input id="search-input" type="text" value="" placeholder="请输入搜索内容..." />
        </form>
        <div id="log">
            <img src="img/logo1.png">
        </div>
	</div>


// 提交笔记获取当前用户头像
<div class="comment-user">'+'<a href="'+'#'+'">
<img src="'+$("#user_saveFileName img").eq(0).attr("src")+'"/></a>
<a href="'+'#'+'">
<span class="user">'+$("#user_nickName a").eq(0).text()+'：'+'</span>
</a></div><div class="comment-main">
<div class="comment-text">'+textarea.value+'</div>
<div class="comment-date">'+getCurrentDate()+'<a class="comment-zan" href="javascript:;" total="0" my="0">赞(0)</a>
<a class="comment-dele" href="javascript:;">删除</a></div></div>'
