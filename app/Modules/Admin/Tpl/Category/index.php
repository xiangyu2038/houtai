<?php if (!defined('APP_VERSION')) exit(); ?>
<Admintemplate file="Common/Head"/>
<body class="J_scroll_fixed">
<div class="wrap J_check_wrap">
  <Admintemplate file="Common/Nav"/>
  <div class="h_a">温馨提示</div>
  <div class="prompt_text">
    <p>温馨提示：请在添加、修改分类全部完成后，<a href="{:U("Category/public_cache")}">更新分类缓存</a>，否则可能出现未知错误！</p>
  </div>
  <form name="myform" action="{:U("Category/listorder")}" method="post">
  <div class="table_list">
    <table width="100%">
        <colgroup>
        <col width="38">
        <col width="120">
        <col>
        <col width="100">
        <col width="100">
        <col width="100" >
        <col width="200">
        <col width="250">
        </colgroup>
        <thead>
          <tr>
            <td align='center'>排序</td>
            <td align='center'>CatID</td>
            <td>分类名称</td>
            <td align='center'>分类类型</td>
            <td align='center'>所属模型</td>
            <td align='center'>访问</td>
            <td align='center'>域名绑定须知</td>
            <td align='center'>管理操作</td>
          </tr>
        </thead>
        {$categorys}
      </table>
    <div class="btn_wrap">
      <div class="btn_wrap_pd">
        <button class="btn btn_submit mr10 J_ajax_submit_btn" type="submit">排序</button>
      </div>
    </div>
  </div>
  </div>
</form>
</div>
<script src="{$config_siteurl}statics/js/common.js?v"></script>
</body>
</html>