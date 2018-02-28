<?php

/**
 * 获取头像
 * Some rights reserved：it100.net
 * Contact email:admin@it100.net
 */
class AvatarAction extends AppframeAction {

    /**
     * 根据用户uid获取系统用户头像
     * http://www.it100.net/api.php?m=avatar&uid=用户id
     */
    public function index() {
        $uid = isset($_GET['uid']) ? $_GET['uid'] : 0;
        $size = isset($_GET['size']) ? $_GET['size'] : 90;
        $random = isset($_GET['random']) ? $_GET['random'] : '';
        $connect = isset($_GET['connect']) ? true : false;
        if (empty($random)) {
            header("HTTP/1.1 301 Moved Permanently");
            header("Last-Modified:" . date('r'));
            header("Expires: " . date('r', time() + 86400));
        }
        $avatar_url = service("Passport")->user_getavatar((int)$uid,(int)$size,$connect);
        header('Location: '.$avatar_url);
    }
    
    /**
     * 根据邮箱地址，获取gravatar头像
     * http://www.it100.net/api.php?m=avatar&a=gravatar&email=用户邮箱
     */
    public function gravatar(){
        $id_or_email = $this->_get("email");
        
        $default = '/statics/images/member/nophoto.gif';
    	header('Location: '. $default);
    	exit;
        
        /*$size = $this->_get("size")?$this->_get("size"):96;
        $default = $this->_get("default");
        $alt = $this->_get("alt")?$this->_get("alt"):false;
        
        $pic = get_avatar($id_or_email, $size, $default, $alt);
        if(!$pic) $pic = $default;
        
        header('Location: '. $pic);*/
    }

}

?>
