<?php if (!defined('APP_VERSION')) exit(); ?><!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="padding: 30px 50px; background: none;">
    接受邮件的地址：<input id="email" class="input" type="text" placeholder="请输入你接受sql文件的邮箱" name="email" value="" />
    <script type="text/javascript">
        function getEmail(){
            return document.getElementById("email").value;
        }
    </script>
</body>
</html>
