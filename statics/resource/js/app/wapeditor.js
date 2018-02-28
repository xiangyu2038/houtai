! function() {
	window.WAPEDITOR = {
		templates: [],
		modules: [{
			id: "header",
			name: "微页面标题",
			issystem: !0,
			params: {
				title: "微页面标题",
				description: "",
				thumb: "",
				bgColor: ""
			}
		}, {
			id: "UCheader",
			name: "会员主页",
			issystem: !0,
			params: {
				title: "会员主页",
				cover: "",
				bgImage: ""
			}
		}, {
			id: "userCard",
			name: "会员卡",
			issystem: !0,
			params: {
				title: "会员卡",
				cover: "",
				bgImage: "",
				fields: []
			}
		}, {
			id: "cardBasic",
			name: "会员卡基本设置",
			issystem: !0,
			params: {
				title: "会员卡",
				color: {
					title: "#333",
					rank: "#333",
					name: "#333",
					number: "#333"
				},
				description: "1、本卡采取记名消费方式\n2、持卡人可享受会员专属优惠\n3、本卡不能与其他优惠活动同时使用\n4、持卡人可用卡内余额进行消费",
				background: {
					type: "system",
					image: util.tomedia("images/global/card/6.png")
				},
				logo: util.tomedia("http://www.baidu.com/img/bdlogo.gif"),
				format_type: 1,
				format: "WQ2015*****#####***",
				fields: [{
					title: "姓名",
					require: 1,
					bind: "realname"
				}, {
					title: "手机",
					require: 1,
					bind: "mobile"
				}],
				grant: {
					credit1: 0,
					credit2: 0,
					coupon: 0,
					couponTitle: ""
				},
				grant_rate: 0,
				offset_rate: 0,
				offset_max: 0
			}
		}, {
			id: "cardActivity",
			name: "会员卡优惠设置",
			issystem: !0,
			params: {
				discount_type: 0,
				discount_style: 1,
				discounts: [],
				content: "",
				bgColor: ""
			}
		}, {
			id: "cardNums",
			name: "会员卡次数设置",
			issystem: !0,
			params: {
				nums_status: 0,
				nums_style: 1,
				nums_text: "可用次数",
				nums: [{
					recharge: 100,
					num: 5
				}, {
					recharge: 200,
					num: 10
				}]
			}
		}, {
			id: "cardTimes",
			name: "会员卡计时设置",
			issystem: !0,
			params: {
				times_status: 0,
				times_style: 1,
				times_text: "截至日期",
				times: [{
					recharge: 100,
					time: 5
				}, {
					recharge: 200,
					time: 10
				}]
			}
		}, {
			id: "richText",
			name: "富文本",
			params: {
				bgColor: "",
				content: "",
				isfull: !1
			}
		}, {
			id: "adImg",
			name: "幻灯片",
			params: {
				listStyle: 1,
				sizeType: 1,
				items: []
			}
		}, {
			id: "cube",
			name: "图片魔方",
			params: {
				layout: {},
				showIndex: 0,
				selection: {},
				currentPos: {},
				currentLayout: {
					isempty: !0
				}
			}
		}, {
			id: "title",
			name: "标题",
			params: {
				title: "",
				template: 1,
				tradition: {
					subtitle: "",
					align: "left",
					bgcolor: "",
					nav: {
						title: "",
						url: "",
						enable: 0
					}
				},
				news: {
					date: "",
					author: "",
					title: "",
					urlType: 1,
					url: ""
				}
			}
		}, {
			id: "textNav",
			name: "文本导航",
			params: {
				items: []
			}
		}, {
			id: "navImg",
			name: "图片导航",
			params: {
				items: [{
					imgurl: "",
					title: "",
					url: ""
				}, {
					imgurl: "",
					title: "",
					url: ""
				}, {
					imgurl: "",
					title: "",
					url: ""
				}, {
					imgurl: "",
					title: "",
					url: ""
				}]
			}
		}, {
			id: "link",
			name: "关联链接",
			params: {
				items: []
			}
		}, {
			id: "line",
			name: "辅助线",
			params: {}
		}, {
			id: "white",
			name: "辅助空白",
			params: {
				height: 1
			}
		}, {
			id: "audio",
			name: "语音",
			params: {
				style: "1",
				headimg: "",
				align: "left",
				title: "",
				isloop: !1,
				reload: "false",
				audio: {
					id: "",
					url: ""
				}
			}
		}, {
			id: "notice",
			name: "公告",
			params: {
				notice: ""
			}
		}]
	}
}(), define(["angular.sanitize", "jquery.ui", "underscore", "fileUploader", "datetimepicker"], function(a, b, c, d) {
	! function() {
		var d = window.WAPEDITOR.modules || {},
			e = a.module("app", ["ngSanitize"]);
		e.controller("commonCtrl", ["$scope", "$sanitize", function(e, f) {
			e.modules = [], e.editors = [], e.activeModules = window.activeModules ? window.activeModules : [], e.activeItem = {}, e.activeIndex = 0, e.index = window.activeModules ? window.activeModules.length : 0, e.submit = {
				params: {},
				html: ""
			}, e.addItem = function(d) {
				a.forEach(e.modules, function(f, g) {
					if(f.id == d) {
						for(-1 == b.inArray(d, e.editors) && e.editors.push(f.id); 0 != b("#module-" + e.index).size();) e.index++;
						return e.activeModules.push({
							id: f.id,
							name: f.name,
							params: a.copy(f.params),
							issystem: f.issystem ? 1 : 0,
							index: e.index,
							displayorder: f.displayorder ? f.displayorder : e.activeModules.length
						}), e.activeIndex = c.findIndex(e.activeModules, {
							index: parseInt(e.index)
						}), e.activeItem = e.activeModules[e.activeIndex], e.triggerActiveItem(e.activeIndex), void e.index++
					}
				}), b(".modules").sortable({
					update: function(a, b) {
						e.updateSort(a, b)
					},
					items: ".js-sorttable"
				})
			}, e.triggerActiveItem = function(a) {
				if(b("#module-" + e.activeModules[a].index).size() && b("#editor" + e.activeModules[a].id).size()) {
					clearTimeout(e.timer);
					var c = b(".app-preview .app-content").offset().top ? b(".app-preview .app-content").offset().top : 200,
						d = b("#module-" + e.activeModules[a].index).offset().top - c;
					b("#editor" + e.activeModules[a].id).css("marginTop", d), b("html,body").animate({
						scrollTop: d
					}, 500)
				} else e.timer = setTimeout(function() {
					e.triggerActiveItem(e.activeIndex)
				}, 50)
			}, e.editItem = function(a) {
				var a = c.findIndex(e.activeModules, {
					index: parseInt(a)
				});
				a > -1 && (e.activeIndex = a, e.activeItem = e.activeModules[a]), -1 == b.inArray(e.activeItem.id, e.editors) && e.editors.push(e.activeItem.id), e.triggerActiveItem(a)
			}, e.deleteItem = function(a) {
				if(confirm("删除后需要重新提交才会生效，确认吗？")) {
					var a = c.findIndex(e.activeModules, {
						index: parseInt(a)
					});
					b("#module-" + a).prev().attr("index");
					e.activeModules = c.without(e.activeModules, e.activeModules[a]), e.activeItem = {}
				}
			}, e.submit = function(d) {
				function f(a, b) {
					var c = "&lt;?php  $" + a + " = modulefunc('widget', 'site_widget_" + a + "', array(	'func' => 'site_widget_" + a + "',	'params' => '" + JSON.stringify(b) + "',	'uniacid' => '" + window.sysinfo.uniacid + "',	'acid' => '" + window.sysinfo.acid + "',)); if(is_array($" + a + ")) { $i=0; foreach($" + a + " as $i => $row) { $i++; $row['iteration'] = $i; ?&gt";
					return c
				}

				function g() {
					var a = "&lt;?php }} ?&gt";
					return a
				}

				function h(a) {
					for(var b in a) "$$hashKey" == b ? delete a[b] : "object" == typeof a[b] && h(a[b])
				}
				e.submit.params = a.copy(e.activeModules), h(e.submit.params);
				var i = "",
					j = b(b(".modules").html());
				j.find("div.ng-scope[ng-controller$='Ctrl']").each(function() {
					var d = c.findIndex(e.activeModules, {
							index: parseInt(b(this).parent().parent().attr("index"))
						}),
						h = "",
						j = a.copy(e.activeModules[d].params);
					b(this).find(".js-default-content").remove();
					var k = b(this).parent().parent().attr("name").toLowerCase();
					if("link" == k) {
						var l = this;
						a.forEach(j.items, function(a, c) {
							(a.selectCate.pid || a.selectCate.cid) && b(l).find(".list-group").children().eq(c).replaceWith("<div>" + f("link", a) + '<div class="list-group-item ng-scope"><a href="{$row[url]}" class="clearfix"><span class="app-nav-title"> {$row[title]}<i class="pull-right fa fa-angle-right"></i></span></a></div>' + g() + "</div>")
						}), h = b(this).html()
					} else h = b(this).html();
					i += '<div type="' + k + '">' + h + "</div>", d++
				});
				var k = e.activeModules[0].params.bgColor;
				i = '<div style="background-color:' + k + '">' + i + "</div>", i = i.replace(/<\!\-\-([^-]*?)\-\->/g, ""), i = i.replace(/ ng\-[a-zA-Z-]+=\"[^\"]*\"/g, ""), i = i.replace(/ ng\-[a-zA-Z]+/g, ""), e.submit.html = i, e.$apply("submit"), b(d.target).parents("form").submit()
			}, e.updateSort = function(a, d) {
				b(".modules").children().each(function() {
					var a = c.findIndex(e.activeModules, {
						index: parseInt(b(this).attr("index"))
					});
					e.activeModules[a].displayorder = b(this).index()
				}), e.activeIndex = c.findIndex(e.activeModules, {
					index: parseInt(d.item.attr("index"))
				}), e.$apply()
			}, e.init = function(f, g) {
				if(c.isNull(f) && (e.modules = d), c.isArray(f))
					for(i in f) {
						var h, j = c.findIndex(d, {
							id: f[i]
						});
						j > -1 && (h = a.copy(d[j]), e.modules.push(h))
					}
				if(c.isArray(g))
					for(i in g) {
						var j = c.findIndex(e.modules, {
							id: g[i]
						});
						j > -1 && (e.modules[j].defaultshow = !0)
					}
				if(e.activeModules.length > 0) {
					var k = [];
					a.forEach(e.activeModules, function(a, b) {
						a && k.push(a.id)
					})
				}
				a.forEach(e.modules, function(a, c) {
					a.defaultshow && -1 == b.inArray(a.id, k) && e.addItem(a.id)
				})
			}, e.tomedia = function(a) {
				return window.sysinfo.attachurl + a
			}, e.url = function(a) {
				a = a.split("/");
				var b = "./index.php?i=" + window.sysinfo.uniacid + "&j=" + window.sysinfo.acid + "&c=" + a[0];
				return a[1] && (b += "&a=" + a[1]), a[2] && (b += "&do=" + a[2]), b
			}, b(".js-editor-submit").click(function(a) {
				e.submit(a)
			}), b(".modules").sortable({
				update: function(a, b) {
					e.updateSort(a, b)
				},
				items: ".js-sorttable"
			}), b(".modules").disableSelection()
		}]), window.wapeditor = e
	}(),
	function(e) {
		e.controller("adImgCtrl", ["$scope", function(a) {
			a.addItem = function() {
				d.show(function(c) {
					a.activeItem.params.items.push({
						id: c.id,
						imgurl: c.url,
						title: "",
						url: "",
						isactive: !1
					}), b.each(a.activeItem.params.items, function(b, c) {
						a.activeItem.params.items[0].isactive = 0 == b
					}), a.$apply("activeItem")
				}, {
					direct: !0,
					multiple: !1
				})
			}, a.removeItem = function(d) {
				index = b.inArray(d, a.activeItem.params.items), items = c.clone(a.activeItem.params.items), a.activeItem.params.items = [];
				for(i in items) i != index && a.activeItem.params.items.push(items[i])
			}, a.addEmpty = function() {
				a.activeItem.params.items.push({
					imgurl: "",
					title: "",
					url: ""
				})
			}, a.changeItem = function(c) {
				d.init(function(d) {
					var e = b.inArray(c, a.activeItem.params.items);
					e > -1 && (a.activeItem.params.items[e].id = d.id, a.activeItem.params.items[e].imgurl = d.url, a.$apply())
				}, {
					direct: !0,
					multiple: !1
				})
			}
		}]), e.controller("audioCtrl", ["$scope", function(a) {
			a.addAudioItem = function() {
				d.init(function(c) {
					c && (a.activeItem.params.audio.id = c.id, a.activeItem.params.audio.url = c.attachment, a.$apply(), b(".audio-player-play").click(function() {
						var c = a.activeItem.params.audio.url;
						if(c) {
							b("#player").remove();
							var d = b('<div id="player"></div>');
							b(document.body).append(d), d.data("control", b(this)), d.jPlayer({
								playing: function() {
									b(this).data("control").find("i").removeClass("fa-play").addClass("fa-stop")
								},
								pause: function(a) {
									b(this).data("control").find("i").removeClass("fa-stop").addClass("fa-play")
								},
								swfPath: "resource/components/jplayer",
								supplied: "mp3,wma,wav,amr",
								solution: "html, flash"
							}), d.jPlayer("setMedia", {
								mp3: c
							}).jPlayer("play"), b(this).find("i").hasClass("fa-stop") ? d.jPlayer("stop") : d.jPlayer("setMedia", {
								mp3: c
							}).jPlayer("play")
						}
					}).show())
				}, {
					direct: !0,
					multiple: !1,
					type: "audio"
				})
			}, a.addImgItem = function() {
				d.init(function(b) {
					a.activeItem.params.headimg = b.url, a.$apply()
				}, {
					direct: !0,
					multiple: !1
				})
			}
		}]), e.controller("cardActivityCtrl", ["$scope", function(a) {}]), e.controller("cardBasicCtrl", ["$scope", function(a) {
			a.creditnames = creditnames
		}]), e.controller("cardNumsCtrl", ["$scope", function(a) {}]), e.controller("cardTimesCtrl", ["$scope", function(a) {}]), e.controller("componentCtrl", ["$scope", function(a) {}]), e.controller("cubeCtrl", ["$scope", function(a) {
			if(a.activeItem.params && a.activeItem.params.layout && c.isEmpty(a.activeItem.params.layout))
				for(row = 0; row < 4; row++)
					for(a.activeItem.params.layout[row] = {}, col = 0; col < 4; col++) a.activeItem.params.layout[row][col] = {
						cols: 1,
						rows: 1,
						isempty: !0,
						imgurl: "",
						classname: ""
					};
			b(".layout-table").bind("mouseover", function(a) {
				if("LI" == a.target.tagName) {
					b(".layout-table li").removeClass("selected");
					var c = b(a.target).attr("data-rows"),
						d = b(a.target).attr("data-cols");
					b(".layout-table li").filter(function(a, e) {
						return b(e).attr("data-rows") <= c && b(e).attr("data-cols") <= d
					}).addClass("selected")
				}
			}), a.activeItem.params.currentLayout = {}, a.showSelection = function(d, e) {
				a.activeItem.params.currentPos = {
					row: d,
					col: e
				}, a.activeItem.params.selection = {};
				var f = -1,
					g = 1;
				for(i = d; i < 4; i++) {
					for(y = 1, a.activeItem.params.selection[g] = {}, j = e; j < 4; j++) f >= 0 && f < j || (!c.isUndefined(a.activeItem.params.layout[i][j]) && a.activeItem.params.layout[i][j].isempty ? (a.activeItem.params.selection[g][y] = {
						rows: g,
						cols: y
					}, y++) : f = j - 1);
					g++
				}
				return b(".layout-table li").removeClass("selected"), a.modalobj = b("#modal-cube-layout").modal({
					show: !0
				}), !0
			}, a.selectLayout = function(b, d, e, f) {
				for(c.isUndefined(e) && (e = 0), c.isUndefined(f) && (f = 0), a.activeItem.params.layout[b][d] = {
						cols: f,
						rows: e,
						isempty: !1,
						imgurl: "",
						classname: "index-" + a.activeItem.params.showIndex
					}, i = b; i < parseInt(b) + parseInt(e); i++)
					for(j = d; j < parseInt(d) + parseInt(f); j++)(b != i || d != j) && delete a.activeItem.params.layout[i][j];
				return a.activeItem.params.showIndex++, a.modalobj.modal("hide"), a.changeItem(b, d), !0
			}, a.addItem = function(b, c) {
				d.show(function(b) {
					a.activeItem.params.currentLayout.id = b.id, a.activeItem.params.currentLayout.imgurl = b.url, a.$apply()
				}, {
					direct: !0,
					multiple: !1
				})
			}, a.changeItem = function(c, d) {
				b("#cube-editor td").removeClass("current").filter(function(a, e) {
					return b(e).attr("x") == c && b(e).attr("y") == d
				}).addClass("current"), b("#thumb").attr("src", ""), a.activeItem.params.currentLayout = a.activeItem.params.layout[c][d]
			}
		}]), e.controller("headerCtrl", ["$scope", function(a) {
			a.addThumb = function(b) {
				d.show(function(c) {
					a.activeItem.params[b] = c.url, a.$apply("activeItem")
				}, {
					direct: !0,
					multiple: !1
				})
			}
		}]), e.controller("homePageCtrl", ["$scope", function(a) {
			activeMenus ? a.activeMenus = activeMenus : a.activeMenus = []
		}]), e.controller("lineCtrl", ["$scope", function(a) {}]), e.controller("linkCtrl", ["$scope", "$http", function(a, d) {
			a.pageSize = c.range(0, 30), a.addItem = function() {
				a.activeItem.params.items.push({
					title: "",
					url: "",
					type: 1,
					selectCate: {
						name: "",
						id: 0
					},
					pageSize: 3
				})
			}, a.removeItem = function(d) {
				index = b.inArray(d, a.activeItem.params.items), items = c.clone(a.activeItem.params.items), a.activeItem.params.items = [];
				for(i in items) i != index && a.activeItem.params.items.push(items[i])
			}, a.showSearchCateList = function(c) {
				a.currentItem = c;
				var e = b(".js-search-cate-keyword").val();
				return e = "undefined" == typeof e ? "" : e, d.get("./index.php?c=utility&a=link&do=catelist&keyword=" + e).success(function(c, d, e, f) {
					a.searchCateList = [];
					var g = c.message;
					for(i in g) a.searchCateList.push({
						id: g[i].id,
						name: g[i].name,
						children: g[i].children
					});
					a.modalobj = b("#modal-search-cate-link").modal({
						show: !0
					})
				}), !0
			}, a.selectCateItem = function(b, c, d) {
				return a.currentItem.selectCate = {
					pid: b,
					cid: c,
					name: d
				}, a.modalobj.modal("hide"), !0
			}
		}]), e.controller("navImgCtrl", ["$scope", function(a) {
			a.changeItem = function(b) {
				d.show(function(c) {
					b.id = c.id, b.imgurl = c.url, a.$apply()
				}, {
					direct: !0,
					multiple: !1
				})
			}
		}]), e.controller("noticeCtrl", ["$scope", function(a) {}]), e.controller("mainCtrl", ["$scope", "$sanitize", function(a, b) {
			a.init(null, ["header"]), a.editItem(0)
		}]), e.controller("quickMenuCtrl", ["$scope", function(d) {
			activeItem ? d.activeItem = activeItem : d.activeItem = {
				navStyle: 1,
				bgColor: "#2B2D30",
				menus: [],
				extend: [],
				position: {
					homepage: !0,
					usercenter: !0,
					page: !0,
					article: !0
				},
				ignoreModules: {}
			}, d.submit = {}, d.selectNavStyle = function() {
				d.activeItem.navStyle = b('input[name="nav_style"]:checked').val(), d.$apply("activeItem")
			}, d.addMenu = function() {
				d.activeItem.menus.push({
					title: "标题",
					url: "",
					submenus: [],
					icon: {
						name: "fa-home",
						color: "#ffffff"
					},
					image: "",
					hoverimage: "",
					hovericon: ""
				})
			}, d.addSubMenu = function(a) {
				a.submenus.push({
					title: "标题",
					url: ""
				})
			}, d.submit = function(c) {
				function e(a) {
					for(var b in a) "$$hashKey" == b ? delete a[b] : "object" == typeof a[b] && e(a[b])
				}
				d.submit.params = a.copy(d.activeItem), e(d.submit.params);
				var f = b(".nav-menu").html();
				f = f.replace(/<\!\-\-([^-]*?)\-\->/g, ""), f = f.replace(/ng\-[a-zA-Z-]+=\"[^\"]*\"/g, ""), f = f.replace(/ng\-[a-zA-Z]+/g, ""), f = f.replace(/[\t\n\n\r]/g, ""), d.submit.html = f, d.$apply("submit"), b(c.target).parents("form").submit()
			}, d.removeMenu = function(c) {
				index = b.inArray(c, d.activeItem.menus), items = a.copy(d.activeItem.menus), d.activeItem.menus = [];
				for(i in items) i != index && d.activeItem.menus.push(items[i])
			}, d.removeSubMenu = function(a, b) {
				d.activeItem.menus[a].submenus = c.without(d.activeItem.menus[a].submenus, b)
			}, d.showSearchModules = function() {
				d.moduleDialog = b("#shop-modules-modal").modal(), b("#shop-modules-modal .modal-body .btn-primary").html("取消"), b("#shop-modules-modal").find(".modal-footer .btn-primary").unbind("click").click(function() {
					d.activeItem.ignoreModules = {}, b("#shop-modules-modal .modal-body .btn-primary").each(function() {
						d.hasIgnoreModules = !0, d.activeItem.ignoreModules[b(this).attr("js-name")] = {
							name: b(this).attr("js-name"),
							title: b(this).attr("js-title")
						}
					}), d.$apply("activeItem"), d.$apply("hasIgnoreModules")
				})
			}, b(".js-editor-submit").click(function(a) {
				d.submit(a)
			}), d.hasIgnoreModules = c.size(d.activeItem.ignoreModules), b(".nav-menu").show(), b(".app-shopNav-edit").show()
		}]), e.controller("richTextCtrl", ["$scope", "$sce", function(a, b) {
			a.trustAsHtml = function(a) {
				return b.trustAsHtml(a)
			}
		}]), e.controller("textNavCtrl", ["$scope", function(a) {
			a.addItem = function() {
				a.activeItem.params.items.push({
					title: "",
					url: ""
				})
			}, a.removeItem = function(d) {
				index = b.inArray(d, a.activeItem.params.items), items = c.clone(a.activeItem.params.items), a.activeItem.params.items = [];
				for(i in items) i != index && a.activeItem.params.items.push(items[i])
			}
		}]), e.controller("titleCtrl", ["$scope", function(a) {
			a.changeNavEnable = function(b) {
				a.activeItem.params.tradition.nav.enable = b
			}
		}]), e.controller("userCardCtrl", ["$scope", function(a) {
			a.init(null, ["cardBasic", "cardActivity", "cardNums", "cardTimes"]), a.activeModules[1].params.discounts = discounts, a.addFields = function() {
				a.activeItem.params.fields.push({
					title: "",
					require: 1,
					bind: "",
					issystem: 0
				})
			}, a.removeFields = function(b) {
				return "mobile" == b.bind || "realname" == b.bind ? !1 : (a.activeItem.params.fields = c.without(a.activeItem.params.fields, b), !1)
			}, a.addNums = function() {
				a.activeItem.params.nums.push({
					recharge: "",
					num: ""
				})
			}, a.removeNums = function(b) {
				return a.activeItem.params.nums = c.without(a.activeItem.params.nums, b), !1
			}, a.addTimes = function() {
				a.activeItem.params.times.push({
					recharge: "",
					time: ""
				})
			}, a.removeTimes = function(b) {
				return a.activeItem.params.times = c.without(a.activeItem.params.times, b), !1
			}, a.selectCoupon = function() {
				util.coupon(function(b) {
					a.activeItem.params.grant.couponTitle = b.title, a.activeItem.params.grant.coupon = b.couponid, a.$apply("activeItem")
				}, {
					multiple: !1
				})
			}, a.addThumb = function(b) {
				d.show(function(c) {
					a.activeItem.params[b] = c.url, a.$apply("activeItem")
				}, {
					direct: !0,
					multiple: !1
				})
			}, a.addBgThumb = function() {
				d.show(function(b) {
					a.activeItem.params.background.image = b.url, a.$apply("activeItem")
				}, {
					direct: !0,
					multiple: !1
				})
			}, a.fansFields = fansFields, a.editItem(0)
		}]), e.controller("userCenterCtrl", ["$scope", function(a) {
			a.init(null, ["UCheader"]), a.addThumb = function(b) {
				d.show(function(c) {
					a.activeItem.params[b] = c.url, a.$apply("activeItem")
				}, {
					direct: !0,
					multiple: !1
				})
			}, a.showIconBrowser = function(b) {
				util.iconBrowser(function(c) {
					b.css.icon.icon = c, a.$apply("activeMenus")
				})
			}, a.addMenu = function() {
				a.activeMenus.push({
					icon: "",
					css: {
						icon: {
							icon: "fa fa-external-link"
						}
					},
					name: "",
					url: ""
				})
			}, a.removeMenu = function(b) {
				a.activeMenus = c.without(a.activeMenus, b)
			}, activeMenus ? a.activeMenus = activeMenus : a.activeMenus = [], a.editItem(0)
		}]), e.controller("whiteCtrl", ["$scope", function(a) {
			0 == b(".slider-bar .ui-slider-handle").length && b(".slider-bar").slider({
				min: 1,
				max: 100,
				slide: function(b, c) {
					a.activeItem.params.height = c.value, a.$apply()
				}
			}), b("#module-" + a.activeIndex).click(function() {
				b(".slider-bar").slider("option", "value", a.activeItem.params.height)
			})
		}]), e.directive("ngMyColorpicker", [function() {
			var a = {
				template: window.WAPEDITOR.templates["colorpicker-template"],
				scope: {
					colorValue: "=ngMyColor",
					colorDefault: "=ngMyDefaultColor"
				},
				link: function(a, c, d) {
					b(c).data("data-colorpicker-init") || (util.colorpicker(c, function(d) {
						b(c).parent().parent().find(":text").val(d.toHexString()), a.colorValue = d.toHexString(), a.$apply("colorValue"), a.$watch("colorValue", function(d) {
							b(c).spectrum("get") != d && (b(c).spectrum("set", d ? d : a.colorDefault), b(c).parent().parent().find(":text").val(d ? d : a.colorDefault), b(c).parent().parent().find(".input-group-addon").css("background-color", d ? d : a.colorDefault))
						})
					}), b(".colorclean").click(function() {
						b(c).parent().parent().find(":text").val(""), b(c).parent().parent().find(".input-group-addon").css("background-color", a.colorDefault), a.colorValue = a.colorDefault, b(c).spectrum("set", a.colorDefault), a.$apply("colorValue")
					}), b(c).data("data-colorpicker-init", !0))
				}
			};
			return a
		}]), e.directive("ngMyDatePicker", ["$http", "$parse", function() {
			var a = {
				transclude: !0,
				template: "<span ng-transclude></span>",
				scope: {
					dateValue: "=ngMyDateValue"
				},
				link: function(a, b, c) {
					var d = {
						lang: "zh",
						step: "30",
						format: "Y-m-d H:i:s",
						closeOnDateSelect: !0,
						onSelectDate: function(b, c) {
							a.dateValue = b.dateFormat("Y-m-d H:i:s"), a.$apply("dateValue")
						},
						onSelectTime: function(b, c) {
							a.dateValue = b.dateFormat("Y-m-d H:i:s"), a.$apply("dateValue")
						}
					};
					b.datetimepicker(d)
				}
			};
			return a
		}]), e.directive("ngMyEditor", function() {
			var a = {
				scope: {
					value: "=ngMyValue"
				},
				template: '<textarea id="" rows="10" style="height:600px;width:100%"></textarea>',
				link: function(b, c, d) {
					c.data("editor") || (c.find("textarea").attr("id", "editor" + (new Date).getTime()), a = UE.getEditor(c.find("textarea").attr("id"), ueditoroption), c.data("editor", a), a.addListener("contentChange", function() {
						b.value = a.getContent(), b.$root.$$phase || b.$apply("value")
					}), a.addListener("ready", function() {
						b.value && a && a.getContent() != b.value && a.setContent(b.value), b.$watch("value", function(b) {
							a && a.getContent() != b && a.setContent(b ? b : "")
						})
					}))
				}
			};
			return a
		}), e.directive("ngMyIconer", function() {
			var a = window.WAPEDITOR.templates["iconer-template"],
				c = {
					scope: {
						image: "=ngMyImage",
						icon: "=ngMyIcon"
					},
					transclude: !0,
					template: a,
					link: function(a, c, e) {
						a.selectIcon = function() {
							var c = d.show(function(b) {
								a.image = b.url, a.icon = {}, a.$apply("image"), a.$apply("icon")
							}, {
								direct: !0,
								multiple: !1
							});
							c.on("shown.bs.modal", function() {
								c.find(".nav-pills").append(window.WAPEDITOR.templates["iconer-nav-pills"]), c.find(".tab-content").append(window.WAPEDITOR.templates["iconer-tab-content"]), b.get("./index.php?c=utility&a=icon&callback=selectIconComplete", function(a) {
									c.find("#icon").append(a)
								})
							}), window.selectIconComplete = function(b) {
								a.icon = {}, a.icon.name = b, a.icon.color = c.find("#icon").attr("color"), a.image = "", a.$apply("image"), a.$apply("icon"), c.modal("hide")
							}
						}, a.removeIcon = function() {
							a.image = "", a.icon = {}
						}
					}
				};
			return c
		}), e.directive("ngMyLinker", ["$http", function(a) {
			var d = {
				template: window.WAPEDITOR.templates["linker-template"],
				scope: {
					url: "=ngMyUrl",
					title: "=ngMyTitle"
				},
				link: function(d, e, f) {
					e.find(".input-group-btn").mouseover(function(a) {
						clearTimeout(d.timer), e.find(".dropdown-menu").show()
					}).mouseout(function() {
						d.timer = setTimeout(function() {
							e.find(".dropdown-menu").hide()
						}, 500)
					}), e.find(".dropdown-menu").mouseover(function() {
						clearTimeout(d.timer), e.find(".dropdown-menu").show()
					}).mouseout(function() {
						d.timer = setTimeout(function() {
							e.find(".dropdown-menu").hide()
						}, 500)
					}), d.addLink = function(a, b) {
						d.url = a, b && (d.title = b)
					}, d.searchSystemLinker = function() {
						d.modalobj = util.dialog("请选择链接", ["./index.php?c=utility&a=link&callback=selectLinkComplete"], "", {
							containerName: "link-search-system"
						}), d.modalobj.modal({
							keyboard: !1
						}), d.modalobj.find(".modal-body").css({
							height: "680px",
							"overflow-y": "auto"
						}), d.modalobj.modal("show"), window.selectLinkComplete = function(a, b) {
							d.addLink(a, b), d.$apply("url", "title"), d.modalobj.modal("hide")
						}
					}, d.searchCmsLinker = function(e) {
						var f = {};
						f.header = window.WAPEDITOR.templates["linker-cms-header"], f.content = window.WAPEDITOR.templates["linker-cms-content"], f.footer = "", f.articleitem = window.WAPEDITOR.templates["linker-cms-article-item"], f.cateitem = window.WAPEDITOR.templates["linker-cms-cate-item"], b("#link-search-cms")[0] ? d.modalobj = b("#link-search-cms").data("modal") : (d.modalobj = util.dialog(f.header, f.content, f.footer, {
							containerName: "link-search-cms"
						}), d.modalobj.find(".modal-body").css({
							height: "680px",
							"overflow-y": "auto"
						}), d.modalobj.modal("show"), d.modalobj.on("hidden.bs.modal", function() {
							d.modalobj.remove()
						}), b("#link-search-cms").data("modal", d.modalobj)), e = e || 1, a.get("./index.php?c=utility&a=link&do=articlelist&page=" + e).success(function(a, e, g, h) {
							var j = {
								items: []
							};
							if(a.message.list) {
								for(i in a.message.list) j.items.push({
									title: a.message.list[i].title,
									id: a.message.list[i].id,
									uniacid: a.message.list[i].uniacid,
									attachment: a.message.list[i].thumb_url,
									createtime: a.message.list[i].createtime
								});
								d.modalobj.find("#articlelist tbody").html(c.template(f.articleitem)(j)), d.modalobj.find("#pager").html(a.message.pager), d.modalobj.find("#pager .pagination li[class!='active'] a").click(function() {
									return d.searchCmsLinker(b(this).attr("page")), !1
								}), d.modalobj.find(".js-btn-select").click(function() {
									d.addLink(b(this).attr("js-url"), b(this).attr("js-title")), d.$apply("url", "title"), d.modalobj.modal("hide")
								})
							}
						}), a.get("./index.php?c=utility&a=link&do=catelist&page=" + e).success(function(a, e, g, h) {
							var j = {
								items: []
							};
							if(a.message) {
								for(i in a.message) j.items.push({
									id: a.message[i].id,
									uniacid: a.message[i].uniacid,
									name: a.message[i].name,
									children: a.message[i].children
								});
								d.modalobj.find("#category tbody").html(c.template(f.cateitem)(j)), d.modalobj.find(".js-btn-select").click(function() {
									d.addLink(b(this).attr("js-url"), b(this).attr("js-title")), d.$apply("url", "title"), d.modalobj.modal("hide")
								})
							}
						})
					}, d.searchNewsLinker = function(e) {
						var f = {};
						f.content = window.WAPEDITOR.templates["linker-news-content"], f.footer = "", f.newsitem = window.WAPEDITOR.templates["linker-news-item"], b("#link-search-news")[0] ? d.modalobj = b("#link-search-news").data("modal") : (d.modalobj = util.dialog(f.header, f.content, f.footer, {
							containerName: "link-search-news"
						}), d.modalobj.find(".modal-body").css({
							height: "680px",
							"overflow-y": "auto"
						}), d.modalobj.modal("show"), d.modalobj.on("hidden.bs.modal", function() {
							d.modalobj.remove()
						}), b("#link-search-news").data("modal", d.modalobj)), e = e || 1, a.get("./index.php?c=utility&a=link&do=newslist&page=" + e).success(function(a, e, g, h) {
							var j = {
								items: []
							};
							if(a.message.list) {
								for(i in a.message.list) j.items.push({
									title: a.message.list[i].title,
									id: a.message.list[i].id,
									uniacid: window.sysinfo.uniacid,
									attachment: a.message.list[i].thumb_url,
									createtime: a.message.list[i].createtime
								});
								d.modalobj.find("#newslist tbody").html(c.template(f.newsitem)(j)), d.modalobj.find("#pager").html(a.message.pager), d.modalobj.find("#pager .pagination li[class!='active'] a").click(function() {
									return d.searchNewsLinker(b(this).attr("page")), !1
								}), d.modalobj.find(".js-btn-select").click(function() {
									d.addLink(b(this).attr("js-url"), b(this).attr("js-title")), d.$apply("url", "title"), d.modalobj.modal("hide")
								})
							}
						})
					}, d.searchPageLinker = function(e) {
						var f = {};
						f.content = window.WAPEDITOR.templates["linker-page-content"], f.footer = "", f.pageItem = window.WAPEDITOR.templates["linker-page-item"], b("#link-search-page")[0] ? d.modalobj = b("#link-search-page").data("modal") : (d.modalobj = util.dialog(f.header, f.content, f.footer, {
							containerName: "link-search-page"
						}), d.modalobj.find(".modal-body").css({
							height: "680px",
							"overflow-y": "auto"
						}), d.modalobj.modal("show"), d.modalobj.on("hidden.bs.modal", function() {
							d.modalobj.remove()
						}), b("#link-search-page").data("modal", d.modalobj)), e = e || 1, a.get("./index.php?c=utility&a=link&do=pagelist&&page=" + e).success(function(a, e, g, h) {
							var j = {
								items: []
							};
							if(a.message.list) {
								for(i in a.message.list) j.items.push({
									title: a.message.list[i].title,
									id: a.message.list[i].id,
									uniacid: window.sysinfo.uniacid,
									createtime: a.message.list[i].createtime
								});
								d.modalobj.find("#pageList tbody").html(c.template(f.pageItem)(j)), d.modalobj.find("#pager").html(a.message.pager), d.modalobj.find("#pager .pagination li[class!='active'] a").click(function() {
									return d.searchPageLinker(b(this).attr("page")), !1
								}), d.modalobj.find(".js-btn-select").click(function() {
									d.addLink(b(this).attr("js-url"), b(this).attr("js-title")), d.$apply("url", "title"), d.modalobj.modal("hide")
								})
							}
						})
					}, d.searchMapPosLinker = function() {
						var a = {};
						a.content = window.WAPEDITOR.templates["linker-map-content"], d.modalobj = util.dialog(a.content), d.modalobj.modal("show"), d.modalobj.find("#getnav").click(function() {
							d.addLink("http://api.map.baidu.com/marker?location=" + b("#navlat").val() + "," + b("#navlng").val() + "&title=" + b("#navtitle").val() + "&name=" + b("#navtitle").val() + "&output=html&src=we7", b("#navtitle").val()), d.$apply("url", "title"), d.modalobj.modal("hide")
						})
					}
				}
			};
			return d
		}])
	}(wapeditor), a.module("app").run(["$templateCache", function(a) {
			"use strict";
			a.put("widget-adimg-display.html", '<div ng-controller="adImgCtrl"><link href="../app/resource/components/swiper/swiper.min.css" rel="stylesheet"><!--app图片广告--><div class="app-adImg"><div class="inner"><div class="appstyle js-default-content" ng-if="module.params.items.length == 0"><img ng-show="module.params.listStyle == 1" src="./resource/images/app/adImg-lg.jpg"><!--折叠轮播--> <img ng-show="module.params.listStyle == 2" src="./resource/images/app/adImg-separate.jpg"><!--分开显示--></div><!--折叠轮播--><div class="swiper-container swiper-container-horizontal" ng-if="module.params.items.length != 0 && module.params.listStyle == 1"><div class="swiper-wrapper"><div class="swiper-slide" ng-class="{\'swiper-slide-active\' : $index == 0}" style="width: 100%" ng-repeat="item in module.params.items"><a href="{{item.url}}" style="display:block; width:100%; text-align:center"><img ng-src="{{item.imgurl}}" title="{{item.title}}" style="display:block; height:auto; max-width:100%;  margin:0 auto"></a></div></div><div class="swiper-pagination swiper-pagination-clickable"><span class="swiper-pagination-bullet" ng-class="{\'swiper-pagination-bullet-active\': $index == 0}" ng-repeat="item in module.params.items"></span></div><div class="swiper-button-next hidden"></div><div class="swiper-button-prev hidden"></div></div><!--分开显示--><div class="show-separate" ng-if="module.params.items.length != 0 && module.params.listStyle == 2"><!--大图 lg--><div class="ad-list lg" ng-if="module.params.sizeType == 1"><div class="ad-list-item" ng-repeat="item in module.params.items"><a href="{{item.url}}"><h3 ng-bind="item.title">广告标题</h3><img ng-src="{{item.imgurl}}"></a></div></div><!--小图:sm--><div class="ad-list clearfix sm" ng-if="module.params.sizeType == 2"><div class="ad-list-item col-xs-6 col-sm-6" ng-repeat="item in module.params.items"><a href="{{item.url}}"><h3 ng-bind="item.title">广告标题</h3><img ng-src="{{item.imgurl}}"></a></div></div></div></div></div><!--end图片广告--></div>'), a.put("widget-adimg-editor.html", '<div ng-controller="adImgCtrl"><!--图片广告--><div class="app-adImg-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="control-label col-xs-3">显示方式</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" class="carousel-style" ng-model="activeItem.params.listStyle" value="1" ng-click="activeItem.params.sizeType=1" name="ad-show-style">折叠轮播</label><label class="radio-inline"><input type="radio" class="separate-style" ng-model="activeItem.params.listStyle" value="2" name="ad-show-style">分开显示</label></div></div><div class="form-group"><label class="control-label col-xs-3">显示大小</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" class="size-lg-style" ng-model="activeItem.params.sizeType" value="1" name="ad-size">大图</label><!--分开显示样式才有小图选项--><label class="radio-inline" ng-show="activeItem.params.listStyle == 2"><input type="radio" class="size-sm-style" ng-model="activeItem.params.sizeType" value="2" name="ad-size">小图</label></div></div><div class="add-adImg-item card clearfix" ng-repeat="item in activeItem.params.items"><div class="btns"><a href="#" ng-click="addEmpty()"><i class="fa fa-plus"></i></a> <a href="#" ng-click="removeItem(item)"><i class="fa fa-times"></i></a></div><div class="col-xs-3 img"><h3 ng-click="changeItem(item)">重新上传</h3><img src="" ng-src="{{ item.imgurl }}"></div><div class="col-xs-9"><div class="form-group"><label class="control-label col-xs-3">标题</label><div class="col-xs-9"><input class="form-control" name="title" ng-model="item.title" value="" type="text"></div></div><div class="form-group"><label class="control-label col-xs-3">链接</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="item.url" ng-my-title="item.title"></div></div></div></div></div><div class="add-adImg card" ng-click="addItem()"><a href="#"><i class="fa fa-plus-circle green"></i>添加一个广告</a></div></div></div></div></div><!--end图片广告--></div>'), a.put("widget-audio-display.html", '<div ng-controller="audioCtrl"><!--app语音--><div class="app-audio"><div class="inner"><!--仿微信对话样式	居左:audioLeft   居右:audioRight--><div ng-if="module.params.style == \'1\'" id="audio-music-{{$index+0}}" data-reload="{{module.params.reload}}" class="wx audioLeft clearfix" data-src="{{module.params.audio.url}}" ng-class="{\'audioLeft\': module.params.align == \'left\', \'audioRight\': module.params.align == \'right\'}"><img ng-init="module.params.headimg = module.params.headimg ? module.params.headimg : \'./resource/images/app/shop.png!80x80.jpg\'" ng-src="{{module.params.headimg}}" alt="语音头像" class="audioLogo" width="40" height="40"> <span class="audioBar js-play"><img style="display:none" ng-if="module.params.align == \'left\'" src="./resource/images/app/player.gif" class="audioAnimation"> <img style="display:none" ng-if="module.params.align == \'right\'" src="./resource/images/app/green_player.gif" class="audioAnimation"> <i class="audioStatic"></i> <span style="display:none" class="audioLoading"><i class="fa fa-spinner fa-pulse"></i></span></span> <span class="audioBar js-pause" style="display:none"><img ng-if="module.params.align == \'left\'" src="./resource/images/app/player.gif" class="audioAnimation"> <img ng-if="module.params.align == \'right\'" src="./resource/images/app/green_player.gif" class="audioAnimation"> <i class="audioStatic"></i></span> <span class="audio-time"></span><div class="js-audio-wx" data-id="audio-music-{{$index+0}}"></div></div><div class="music music-play" id="audio-music-{{$index+0}}" data-src="{{module.params.audio.url}}" data-reload="{{module.params.reload}}" data-loop="{{module.params.isloop}}" ng-if="module.params.style == \'2\'"><span class="audioStatic js-play"><a href="javascript:;"><i class="fa fa-play-circle-o"></i></a></span> <span class="audioAnimation js-pause" style="display:none"><a href="javascript:;"><i class="fa fa-pause"></i></a></span> <span class="musicTitle" ng-if="module.params.title == \'\'">歌名儿</span> <span class="musicTitle" ng-if="module.params.title != \'\'">{{module.params.title}}</span> <span class="audioLoading" style="display:none"><i class="fa fa-spinner fa-pulse"></i></span> <span class="audio-time" style="display:none"><span class="audio-current-time">00:00</span>/<span class="audio-duration">00:00</span></span><div class="slider-bar"><div class="slider-fill"></div></div><div class="js-audio-music" data-id="audio-music-{{$index+0}}"></div></div></div></div><!--end语音--></div>'),
				a.put("widget-audio-editor.html", '<div ng-controller="audioCtrl"><!--语音--><div class="app-audio-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-2 control-label">音频</label><div class="col-xs-10"><span class="input-group-btn"><button type="button" class="btn btn-default audio-player-play" style="display:none"><i class="fa fa-play"></i></button> <button ng-click="addAudioItem()" type="button" class="btn btn-default">选择媒体文件</button></span></div></div><div class="form-group"><label class="col-xs-2 control-label">样式</label><div class="col-xs-10"><div class=""><label class="radio-inline"><input type="radio" name="wx-music" value="1" ng-model="activeItem.params.style">模仿微信对话样式</label><div class="form-group" ng-show="activeItem.params.style == \'1\'"><label class="control-label col-xs-3">头像:</label><div class="col-xs-3" style="padding-top:10px"><img ng-init="activeItem.params.headimg = activeItem.params.headimg ? activeItem.params.headimg : \'./resource/images/app/shop.png!80x80.jpg\'" ng-src="{{activeItem.params.headimg}}" alt="语音头像" width="62" height="62"></div><div class="help-block col-xs-6" style="padding-left:0;padding-top:10px"><a href="#" ng-click="addImgItem()">上传头像</a><br>建议尺寸80*80像素<br>如果不设置,默认将使用店铺logo</div></div><div class="form-group" ng-show="activeItem.params.style == \'1\'"><label class="control-label col-xs-3">气泡:</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" name="bubble" value="left" ng-model="activeItem.params.align">居左</label><label class="radio-inline"><input type="radio" name="bubble" value="right" ng-model="activeItem.params.align">居右</label></div></div></div><div class=""><label class="radio-inline"><input type="radio" name="wx-music" value="2" ng-model="activeItem.params.style">简易音乐播放器</label><div><div class="form-group" ng-show="activeItem.params.style == \'2\'"><label class="control-label col-xs-3">标题:</label><div class="col-xs-9"><input class="form-control" type="text" ng-model="activeItem.params.title"></div></div><div class="form-group" ng-show="activeItem.params.style == \'2\'"><label class="control-label col-xs-3">循环:</label><div class="col-xs-9"><label class="checkbox-inline"><input type="checkbox" ng-model="activeItem.params.isloop">开启循环播放</label></div></div></div></div></div></div><div class="form-group"><label class="col-xs-2 control-label">播放</label><div class="col-xs-10"><div><label class="radio-inline"><input type="radio" name="play" ng-model="activeItem.params.reload" value="true">暂停后再回复播放时,从头开始</label></div><div><label class="radio-inline"><input type="radio" name="play" ng-model="activeItem.params.reload" value="false">暂停后再回复播放时,从暂停位置开始</label></div></div></div></div></div></div></div></div>'), a.put("widget-cardactivity-display.html", '<div ng-controller="cardActivityCtrl"><div class="nav-container" ng-if="module.params.discount_type != 0 && module.params.discount_style == 1"><ul><li class="collapse-link"><a class="nav-container-list" href="javascript:;"><span class="nav-title"><i class="fa fa-eye"></i>优惠说明</span> <span class="pull-right"><i class="fa fa-angle-right"></i></span></a><div class="collapse-con"><table class="table table-bordered"><thead><tr><th>会员等级</th><th>所需积分</th><th>使用条件</th><th>优惠</th></tr></thead><tbody ng-if="module.params.discount_type == 1"><tr ng-repeat="discount in module.params.discounts"><td>{{discount.title}}</td><td>{{discount.credit}}</td><td>满{{discount.condition_1}}元</td><td>减{{discount.discount_1}}元</td></tr></tbody><tbody ng-if="module.params.discount_type == 2"><tr ng-repeat="discount in module.params.discounts"><td>{{discount.title}}</td><td>{{discount.credit}}</td><td>满{{discount.condition_2}}元</td><td>打{{discount.discount_2}}折</td></tr></tbody></table></div></li></ul></div><div class="app-richText" ng-if="module.params.discount_type != 0 && module.params.discount_style == 2" ng-style="{\'background-color\' : module.params.bgColor}"><div class="inner" ng-bind-html="module.params.content" ng-if="module.params.content"></div><div class="inner js-default-content" ng-if="!module.params.content"><p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行 <strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline">下划线</span>、 <span style="text-decoration: line-through">删除线</span>、文字<span style="color: rgb(0, 176, 240)">颜色</span>、 <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255)">背景色</span>、 以及字号<span style="font-size: 20px">大</span><span style="font-size: 14px">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table class="table-bordered"><tbody><tr><td>中奖客户</td><td>发放奖品</td><td>备注</td></tr><tr><td>猪猪</td><td>内测码</td><td><em><span class="red">已经发放</span></em></td></tr><tr><td>大麦</td><td>积分</td><td><a href="#" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left"><span style="text-align: left">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p></div></div></div>'), a.put("widget-cardactivity-editor.html", '<div ng-controller="cardActivityCtrl"><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><ul class="nav nav-tabs" style="margin:10px 15px 0 15px"><li ng-class="{\'active\' : activeItem.id == \'cardBasic\'}"><a href="javascript:;" ng-click="editItem(0);">基本设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardActivity\'}"><a href="javascript:;" ng-click="editItem(1);">优惠设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardNums\'}"><a href="javascript:;" ng-click="editItem(2);">计次设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardTimes\'}"><a href="javascript:;" ng-click="editItem(3);">计时设置</a></li></ul><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">优惠设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="0" ng-model="activeItem.params.discount_type"> 不开启</label><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.discount_type"> 使用满减功能</label><label class="radio-inline"><input type="radio" value="2" ng-model="activeItem.params.discount_type"> 使用折扣功能</label></div></div><div class="form-group" ng-show="activeItem.params.discount_type == 1" ng-repeat="discount in activeItem.params.discounts"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><span class="input-group-addon">{{discount.title}}</span> <span class="input-group-addon">满</span> <input type="hidden" ng-model="discount.groupid"> <input type="text" class="form-control" ng-model="discount.condition_1"> <span class="input-group-addon">元</span> <span class="input-group-addon">减</span> <input type="text" class="form-control" ng-model="discount.discount_1"> <span class="input-group-addon">元</span></div></div></div><div class="form-group" ng-show="activeItem.params.discount_type == 2" ng-repeat="discount in activeItem.params.discounts"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><span class="input-group-addon">{{discount.title}}</span> <span class="input-group-addon">满</span> <input type="hidden" ng-model="discount.groupid"> <input type="text" class="form-control" ng-model="discount.condition_2"> <span class="input-group-addon">元</span> <span class="input-group-addon">打</span> <input type="text" class="form-control" ng-model="discount.discount_2"> <span class="input-group-addon">折</span></div></div></div><div class="form-group" ng-show="activeItem.params.discount_type != 0"><label class="col-xs-12 col-sm-3 col-md-2 control-label">样式设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.discount_style"> 系统默认</label><label class="radio-inline"><input type="radio" value="2" ng-model="activeItem.params.discount_style"> 自定义</label></div></div><div class="form-group" ng-show="activeItem.params.discount_type != 0 && activeItem.params.discount_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.bgColor" ng-my-default-color="\'#ffffff\'"></div></div></div></div><div class="form-group" ng-show="activeItem.params.discount_type != 0 && activeItem.params.discount_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div ng-my-editor ng-my-value="activeItem.params.content"></div></div></div></div></div></div></div></div>'), a.put("widget-cardbasic-display.html", '<div ng-controller="cardBasicCtrl"><div class="title"><h1><span>会员卡</span></h1></div><div class="card"><div class="card-panel"><div class="card-sn" ng-if="!module.params.format_type" ng-style="{\'color\' : module.params.color[\'number\']}" ng-bind="module.params.format">卡号:{$setting[\'format\']}</div><div class="card-title" ng-style="{\'color\' : module.params.color[\'title\']}" ng-bind="module.params.title"></div><div class="rank" ng-style="{\'color\' : module.params.color[\'rank\']}">白金会员</div><div class="nickname" ng-style="{\'color\' : module.params.color[\'name\']}">我的姓名</div><div class="card-logo"><img src="" ng-if="module.params.logo" ng-src="{{module.params.logo}}"></div><img class="card-bg" src="" ng-if="module.params.background.image" ng-src="{{module.params.background.image}}" width="400px" height="200px"></div><div class="head-nav"><a class="head-nav-list" ng-class="{\'has-nav-2\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 0), \'has-nav-3\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 1), \'has-nav-4\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 2)}" href="javascript:;">{{creditnames.credit1}}<span>900.00</span></a> <a class="head-nav-list" ng-class="{\'has-nav-2\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 0), \'has-nav-3\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 1), \'has-nav-4\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 2)}" href="javascript:;">{{creditnames.credit2}}<span>4000.00</span></a> <a class="head-nav-list" ng-class="{\'has-nav-2\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 0), \'has-nav-3\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 1), \'has-nav-4\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 2)}" ng-show="activeModules[2].params.nums_status == 1" href="javascript:;">{{activeModules[2].params.nums_text}}<span>5次</span></a> <a class="head-nav-list" ng-class="{\'has-nav-2\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 0), \'has-nav-3\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 1), \'has-nav-4\' : (activeModules[2].params.nums_status + activeModules[3].params.times_status == 2)}" ng-show="activeModules[3].params.times_status == 1" href="javascript:;">{{activeModules[3].params.times_text}}<span>7天</span></a></div></div><div class="btn-manage clearfix"><a href="javascript:;" class="recharge">充值</a> <a href="javascript:;" class="payment">付款</a></div></div>'), a.put("widget-cardbasic-editor.html", '<div ng-controller="cardBasicCtrl"><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><ul class="nav nav-tabs" style="margin:10px 15px 0 15px"><li ng-class="{\'active\' : activeItem.id == \'cardBasic\'}"><a href="javascript:;" ng-click="editItem(0);">基本设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardActivity\'}"><a href="javascript:;" ng-click="editItem(1);">优惠设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardNums\'}"><a href="javascript:;" ng-click="editItem(2);">计次设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardTimes\'}"><a href="javascript:;" ng-click="editItem(3);">计时设置</a></li></ul><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">名称<span style="color:red">*</span></label><div class="col-sm-9 col-xs-12"><input type="text" class="form-control" ng-model="activeItem.params.title"></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">背景图案</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="system" ng-init="activeItem.params.background && activeItem.params.background == 0 ? activeItem.params.background = {} : \'\'" ng-model="activeItem.params.background.type"> 系统</label><label class="radio-inline"><input type="radio" value="user" ng-init="activeItem.params.background && activeItem.params.background == 0 ? activeItem.params.background = {} : \'\'" ng-model="activeItem.params.background.type"> 自定义</label></div></div><div class="form-group" ng-show="activeItem.params.background.type == \'user\'"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-xs-9"><span ng-click="addBgThumb()" class="form-control-static"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.background.image"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.background.image}}"> <em ng-click="activeItem.params.background.image = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div></div></div><div class="form-group" ng-show="activeItem.params.background.type == \'system\'"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><select class="form-control" ng-model="activeItem.params.background.image"><option value="{{tomedia(\'images/global/card/1.png\')}}">背景1</option><option value="{{tomedia(\'images/global/card/2.png\')}}">背景2</option><option value="{{tomedia(\'images/global/card/3.png\')}}">背景3</option><option value="{{tomedia(\'images/global/card/4.png\')}}">背景4</option><option value="{{tomedia(\'images/global/card/5.png\')}}">背景5</option><option value="{{tomedia(\'images/global/card/6.png\')}}">背景6</option><option value="{{tomedia(\'images/global/card/7.png\')}}">背景7</option><option value="{{tomedia(\'images/global/card/8.png\')}}">背景8</option><option value="{{tomedia(\'images/global/card/9.png\')}}">背景9</option><option value="{{tomedia(\'images/global/card/10.png\')}}">背景10</option><option value="{{tomedia(\'images/global/card/11.png\')}}">背景11</option><option value="{{tomedia(\'images/global/card/12.png\')}}">背景12</option><option value="{{tomedia(\'images/global/card/13.png\')}}">背景13</option><option value="{{tomedia(\'images/global/card/14.png\')}}">背景14</option><option value="{{tomedia(\'images/global/card/15.png\')}}">背景15</option><option value="{{tomedia(\'images/global/card/16.png\')}}">背景16</option><option value="{{tomedia(\'images/global/card/17.png\')}}">背景17</option><option value="{{tomedia(\'images/global/card/18.png\')}}">背景18</option><option value="{{tomedia(\'images/global/card/19.png\')}}">背景19</option><option value="{{tomedia(\'images/global/card/20.png\')}}">背景20</option><option value="{{tomedia(\'images/global/card/21.png\')}}">背景21</option><option value="{{tomedia(\'images/global/card/22.png\')}}">背景22</option><option value="{{tomedia(\'images/global/card/23.png\')}}">背景23</option></select></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">LOGO</label><div class="col-sm-9 col-xs-12"><span ng-click="addThumb(\'logo\')" class="form-control-static"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.logo"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.logo}}"> <em ng-click="activeItem.params.logo = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">名称颜色<span style="color:red">*</span></label><div class="col-sm-9 col-xs-12"><div ng-init="activeItem.params.color && activeItem.params.color == 0 ? activeItem.params.color = {} : \'\'" ng-my-colorpicker ng-my-color="activeItem.params.color[\'title\']" ng-my-default-color="\'#ffffff\'"></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">会员等级颜色</label><div class="col-sm-9 col-xs-12"><div ng-init="activeItem.params.color && activeItem.params.color == 0 ? activeItem.params.color = {} : \'\'" ng-my-colorpicker ng-my-color="activeItem.params.color[\'rank\']" ng-my-default-color="\'#ffffff\'"></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">会员姓名颜色</label><div class="col-sm-9 col-xs-12"><div ng-init="activeItem.params.color && activeItem.params.color == 0 ? activeItem.params.color = {} : \'\'" ng-my-colorpicker ng-my-color="activeItem.params.color[\'name\']" ng-my-default-color="\'#ffffff\'"></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">卡号颜色</label><div class="col-sm-9 col-xs-12"><div ng-init="activeItem.params.color && activeItem.params.color == 0 ? activeItem.params.color = {} : \'\'" ng-my-colorpicker ng-my-color="activeItem.params.color[\'number\']" ng-my-default-color="\'#ffffff\'"></div></div></div><div class="form-group" style="display:none"><label class="col-xs-12 col-sm-3 col-md-2 control-label">卡号设置<span style="color:red">*</span></label><div class="col-sm-9 col-xs-12"><label class="checkbox-inline"><input type="checkbox" value="1" ng-model="activeItem.params.format_type" ng-init="activeItem.params.format_type = (activeItem.params.format_type == 1 ? true : false)"> 使用手机号作为卡号</label><span class="help-block">强烈推荐使用手机号作为卡号</span><div ng-show="activeItem.params.format_type != 1"><input name="format" type="text" ng-model="activeItem.params.format" ng-init="activeItem.params.format = \'\'" class="form-control"> <span class="help-block"><p>"*"代表任意随机数字，<span style="color:red">"#"代表流水号码, "#"必须连续出现,且只能存在一组.</span></p><p>卡号规则样本："WQ2015*****#####***"</p>注意：规则位数过小会造成卡号生成重复概率增大，过多的重复卡密会造成卡密生成终止 卡密规则中不能带有中文及其他特殊符号 为了避免卡密重复，随机位数最好不要少于8位</span></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">使用说明<span style="color:red">*</span></label><div class="col-sm-9 col-xs-12"><textarea class="form-control" rows="6" ng-model="activeItem.params.description"></textarea><span class="help-block">请填写会员卡的使用说明。</span></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">会员卡资料</label><div class="col-sm-10 col-xs-9"><div ng-repeat="field in activeItem.params.fields" style="margin-left:-15px"><div class="col-sm-10" style="margin-bottom:10px"><div class="input-group"><input type="text" class="form-control" ng-model="field.title" ng-disabled="field.bind == \'realname\' || field.bind == \'mobile\'"> <span class="input-group-addon"><label><input type="checkbox" ng-init="field.require = field.require == 1 ? true : false;" ng-model="field.require" ng-disabled="field.bind == \'realname\' || field.bind == \'mobile\'"> 必填</label></span><select ng-model="field.bind" class="form-control" ng-disabled="field.bind == \'realname\' || field.bind == \'mobile\'"><option value="{{fansfield.bind}}" ng-repeat="fansfield in fansFields" ng-model="field.bind" ng-selected="{{field.bind == fansfield.bind}}">{{fansfield.title}}</option></select></div></div><div class="col-sm-1" style="margin-top:5px" ng-show="field.bind != \'mobile\' && field.bind != \'realname\'"><a href="javascript:;" ng-click="removeFields(field);"><i class="fa fa-times-circle"></i></a></div></div><span class="help-block col-sm-9" style="margin-left:-15px">系统会自动绑定:真实姓名和手机号码</span> <span class="help-block col-sm-9" style="margin-left:-15px"><a href="javascript:;" ng-click="addFields();"><i class="fa fa-plus-circle" title="添加填写项目"></i> 添加填写项目</a></span></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">领卡赠送</label><div class="col-sm-9 col-xs-12"><div class="input-group"><span class="input-group-addon" ng-init="activeItem.params.grant && activeItem.params.grant == 0 ? activeItem.params.grant = {} : \'\'">赠送</span> <input type="text" ng-model="activeItem.params.grant.credit1" class="form-control"> <span class="input-group-addon">积分</span></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><span class="input-group-addon">赠送</span> <input type="text" ng-model="activeItem.params.grant.credit2" class="form-control"> <span class="input-group-addon">余额</span></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><input type="hidden" ng-model="activeItem.params.grant.coupon"> <span class="input-group-addon">已选:<span ng-bind="activeItem.params.grant.couponTitle">{$coupon[\'title\']}</span></span> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="selectCoupon();">搜索优惠券</button></span></div><div class="help-block">还有没有优惠券,点我<a href="{{url(\'activity/coupon\');}}" target="_blank">添加优惠券</a>.注意:赠送的优惠券应该各个会员组都可以领取.否则会造成赠送失败的问题</div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">付款返积分比率</label><div class="col-sm-9 col-xs-12"><div class="input-group"><span class="input-group-addon">每消费 1 元赠送</span> <input type="text" ng-model="activeItem.params.grant_rate" class="form-control"> <span class="input-group-addon">积分</span></div><div class="help-block">设置消费返积分的比率.</div><div class="help-block"><strong class="text-danger">例:兑换比率:1元返10积分,那用户每消费1元,将得到10积分.</strong></div></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">积分抵现金比率</label><div class="col-sm-9 col-xs-12"><div class="input-group"><input type="text" ng-model="activeItem.params.offset_rate" class="form-control"> <span class="input-group-addon">积分抵 1 元</span></div><br><div class="input-group"><span class="input-group-addon">单次最多可抵现</span> <input type="text" ng-model="activeItem.params.offset_max" class="form-control"> <span class="input-group-addon">元</span></div><div class="help-block"><strong class="text-danger">例:积分抵现金比率:100积分抵1元,那用户在消费的时候,将可用账户积分抵消部分金额.</strong></div><div class="help-block"><strong class="text-danger">目前仅支持后台交易抵现，暂不支持手机交易抵现.</strong></div></div></div></div></div></div></div></div>'), a.put("widget-cardnums-display.html", '<div ng-controller="cardNumsCtrl"><div class="nav-container" ng-if="module.params.nums_status == 1 && module.params.nums_style == 1"><ul><li class="collapse-link"><a class="nav-container-list" href="javascript:;"><span class="nav-title"><i class="fa fa-eye"></i>{{module.params.nums_text}}充值</span> <span class="pull-right"><i class="fa fa-angle-right"></i></span></a><div class="collapse-con padding-b-0"><a href="./index.php?i={$_W[\'uniacid\']}&j={$_W[\'acid\']}&c=entry&m=recharge&do=pay&type=card_nums&fee={{num.recharge}}" class="btn btn-warning btn-recharge" ng-repeat="num in module.params.nums">充{{num.recharge}}返{{num.num}}次</a></div></li></ul></div><div class="app-richText" ng-if="module.params.nums_status == 1 && module.params.nums_style == 2" ng-style="{\'background-color\' : module.params.bgColor}"><div class="inner" ng-bind-html="module.params.content" ng-if="module.params.content"></div><div class="inner js-default-content" ng-if="!module.params.content"><p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行 <strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline">下划线</span>、 <span style="text-decoration: line-through">删除线</span>、文字<span style="color: rgb(0, 176, 240)">颜色</span>、 <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255)">背景色</span>、 以及字号<span style="font-size: 20px">大</span><span style="font-size: 14px">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table class="table-bordered"><tbody><tr><td>中奖客户</td><td>发放奖品</td><td>备注</td></tr><tr><td>猪猪</td><td>内测码</td><td><em><span class="red">已经发放</span></em></td></tr><tr><td>大麦</td><td>积分</td><td><a href="#" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left"><span style="text-align: left">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p></div></div></div>'), a.put("widget-cardnums-editor.html", '<div ng-controller="cardNumsCtrl"><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><ul class="nav nav-tabs" style="margin:10px 15px 0 15px"><li ng-class="{\'active\' : activeItem.id == \'cardBasic\'}"><a href="javascript:;" ng-click="editItem(0);">基本设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardActivity\'}"><a href="javascript:;" ng-click="editItem(1);">优惠设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardNums\'}"><a href="javascript:;" ng-click="editItem(2);">计次设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardTimes\'}"><a href="javascript:;" ng-click="editItem(3);">计时设置</a></li></ul><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">计次设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.nums_status"> 开启</label><label class="radio-inline"><input type="radio" value="0" ng-model="activeItem.params.nums_status"> 关闭</label><span class="help-block">如你的业务有需要次数限制，可开启进行设置。</span></div></div><div class="form-group" ng-show="activeItem.params.nums_status == 1"><label class="col-xs-12 col-sm-3 col-md-2 control-label">计次设置</label><div class="col-sm-9 col-xs-12"><input type="text" class="form-control" ng-model="activeItem.params.nums_text"> <span class="help-block">例如：设置为”洗发剩余次数“,前台将显示为：”洗发剩余次数：n次“,请根据自己的业务需求设置。</span></div></div><div class="form-group" ng-show="activeItem.params.nums_status == 1"><label class="col-xs-12 col-sm-3 col-md-2 control-label">充值返次数</label><div class="col-sm-9 col-xs-12"><div ng-repeat="num in activeItem.params.nums" style="margin-left:-15px"><div class="col-sm-8" style="margin-bottom:10px"><div class="input-group"><span class="input-group-addon">充</span> <input type="text" class="form-control" ng-model="num.recharge"> <span class="input-group-addon">元</span> <input type="text" class="form-control" ng-model="num.num"> <span class="input-group-addon">次</span></div></div><div class="col-sm-1" style="margin-top:5px"><a href="javascript:;" ng-click="removeNums(num);"><i class="fa fa-times-circle"></i></a></div></div><div class="help-block col-sm-9" style="margin-left:-15px"><a href="javascript:;" ng-click="addNums();"><i class="fa fa-plus-circle" title="添加充值设置"></i> 添加充值设置</a></div></div></div><div class="form-group" ng-show="activeItem.params.nums_status != 0"><label class="col-xs-12 col-sm-3 col-md-2 control-label">样式设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.nums_style"> 系统默认</label><label class="radio-inline"><input type="radio" value="2" ng-model="activeItem.params.nums_style"> 自定义</label></div></div><div class="form-group" ng-show="activeItem.params.nums_status != 0 && activeItem.params.nums_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.bgColor" ng-my-default-color="\'#ffffff\'"></div></div></div></div><div class="form-group" ng-show="activeItem.params.nums_status != 0 && activeItem.params.nums_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div ng-my-editor ng-my-value="activeItem.params.content"></div></div></div></div></div></div></div></div>'), a.put("widget-cardtimes-display.html", '<div ng-controller="cardTimesCtrl"><div class="nav-container" ng-if="module.params.times_status == 1 && module.params.times_style == 1"><ul><li class="collapse-link"><a class="nav-container-list" href="javascript:;"><span class="nav-title"><i class="fa fa-eye"></i>{{module.params.times_text}}充值</span> <span class="pull-right"><i class="fa fa-angle-right"></i></span></a><div class="collapse-con padding-b-0"><a href="./index.php?i={$_W[\'uniacid\']}&j={$_W[\'acid\']}&c=entry&m=recharge&do=pay&type=card_times&fee={{time.recharge}}" class="btn btn-warning btn-recharge" ng-repeat="time in module.params.times">充{{time.recharge}}返{{time.time}}天</a></div></li></ul></div><div class="app-richText" ng-if="module.params.times_status == 1 && module.params.times_style == 2" ng-style="{\'background-color\' : module.params.bgColor}"><div class="inner" ng-bind-html="module.params.content" ng-if="module.params.content"></div><div class="inner js-default-content" ng-if="!module.params.content"><p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行 <strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline">下划线</span>、 <span style="text-decoration: line-through">删除线</span>、文字<span style="color: rgb(0, 176, 240)">颜色</span>、 <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255)">背景色</span>、 以及字号<span style="font-size: 20px">大</span><span style="font-size: 14px">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table class="table-bordered"><tbody><tr><td>中奖客户</td><td>发放奖品</td><td>备注</td></tr><tr><td>猪猪</td><td>内测码</td><td><em><span class="red">已经发放</span></em></td></tr><tr><td>大麦</td><td>积分</td><td><a href="#" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left"><span style="text-align: left">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p></div></div></div>'), a.put("widget-cardtimes-editor.html", '<div ng-controller="cardTimesCtrl"><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><ul class="nav nav-tabs" style="margin:0px 15px 0 15px"><li ng-class="{\'active\' : activeItem.id == \'cardBasic\'}"><a href="javascript:;" ng-click="editItem(0);">基本设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardActivity\'}"><a href="javascript:;" ng-click="editItem(1);">优惠设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardNums\'}"><a href="javascript:;" ng-click="editItem(2);">计次设置</a></li><li ng-class="{\'active\' : activeItem.id == \'cardTimes\'}"><a href="javascript:;" ng-click="editItem(3);">计时设置</a></li></ul><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 control-label">计时设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.times_status"> 开启</label><label class="radio-inline"><input type="radio" value="0" ng-model="activeItem.params.times_status"> 关闭</label><span class="help-block">如你的业务有需要时长限制，可开启进行设置。</span></div></div><div class="form-group" ng-show="activeItem.params.times_status == 1"><label class="col-xs-12 col-sm-3 col-md-2 control-label">计时设置</label><div class="col-sm-9 col-xs-12"><input type="text" class="form-control" ng-model="activeItem.params.times_text"> <span class="help-block">例如：设置为”到期时间“,系统将根据用户的领卡时间,加上用户的可用时长，计算到期时间，前台将显示为：”到期时间：x年x月x日“,请根据自己的业务需求设置。</span></div></div><div class="form-group" ng-show="activeItem.params.times_status == 1"><label class="col-xs-12 col-sm-3 col-md-2 control-label">充值返时长</label><div class="col-sm-9 col-xs-12"><div ng-repeat="time in activeItem.params.times" style="margin-left:-15px"><div class="col-sm-8" style="margin-bottom:10px"><div class="input-group"><span class="input-group-addon">充</span> <input type="text" class="form-control" ng-model="time.recharge"> <span class="input-group-addon">元</span> <input type="text" class="form-control" ng-model="time.time"> <span class="input-group-addon">天</span></div></div><div class="col-sm-1" style="margin-top:5px"><a href="javascript:;" ng-click="removeTimes(time);"><i class="fa fa-times-circle"></i></a></div></div><div class="help-block col-sm-9" style="margin-left:-15px"><a href="javascript:;" ng-click="addTimes();"><i class="fa fa-plus-circle" title="添加充值设置"></i> 添加充值设置</a></div></div></div><div class="form-group" ng-show="activeItem.params.times_status != 0"><label class="col-xs-12 col-sm-3 col-md-2 control-label">样式设置</label><div class="col-sm-9 col-xs-12"><label class="radio-inline"><input type="radio" value="1" ng-model="activeItem.params.times_style"> 系统默认</label><label class="radio-inline"><input type="radio" value="2" ng-model="activeItem.params.times_style"> 自定义</label></div></div><div class="form-group" ng-show="activeItem.params.times_status != 0 && activeItem.params.times_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.bgColor" ng-my-default-color="\'#ffffff\'"></div></div></div></div><div class="form-group" ng-show="activeItem.params.times_status != 0 && activeItem.params.times_style == 2"><label class="col-xs-12 col-sm-3 col-md-2 control-label"></label><div class="col-sm-9 col-xs-12"><div ng-my-editor ng-my-value="activeItem.params.content"></div></div></div></div></div></div></div></div>'),
				a.put("widget-component-display.html", '<div ng-controller="componentCtrl"><!--app自定义模块--><div class="app-component"><div class="inner"><div class="component-con">点击编辑『自定义页面模块』</div></div></div><!--end自定义模块--></div>'), a.put("widget-component-editor.html", '<div ng-controller="componentCtrl"><!--自定义模块--><div class="app-component-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="control-label col-xs-4">自定义页面模块</label><div class="col-xs-8 form-control-static"><a href="javascript:;" class="componentAdd" data-toggle="modal" data-target="#component-modal"><i class="fa fa-plus-circle"></i>添加</a></div><!--添加模块以后显示以下内容--><div class="col-xs-8 form-control-static hidden"><a href="#"><span class="label label-success">自定义页面模块 | 促销活动</span></a>&nbsp;&nbsp;<a href="#">修改</a></div></div></div></div></div></div><!--end自定义模块--></div>'), a.put("widget-cube-display.html", '<div ng-controller="cubeCtrl"><!--app魔方--><div class="app-cube"><div class="inner"><table><tr ng-repeat="row in module.params.layout" ng-init="rowindex=$index"><td ng-init="colindex=$index" ng-repeat="col in row" class="{{col.classname}} rows-{{col.rows}} cols-{{col.cols}}" ng-class="{\'empty\' : col.isempty, \'not-empty\' : !col.isempty}" rowspan="{{col.rows}}" colspan="{{col.cols}}"><div ng-if="!col.isempty && col.imgurl"><a href="{{col.url}}"><img ng-src="{{col.imgurl}}" width="{{col.cols * 60}}" height="{{col.rows * 60}}"></a></div></td></tr></table></div></div><!--end魔方--></div>'), a.put("widget-cube-editor.html", '<div ng-controller="cubeCtrl"><!--魔方--><div class="app-cube-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label">布局</label><div class="col-xs-9"><table id="cube-editor"><tr ng-repeat="(x, row) in activeItem.params.layout"><td ng-repeat="(y, col) in row" class="{{col.classname}} rows-{{col.rows}} cols-{{col.cols}}" ng-click="col[\'isempty\'] ? showSelection(x, y) : changeItem(x, y)" ng-class="{\'empty\' : col.isempty, \'not-empty\' : !col.isempty}" rowspan="{{col.rows}}" colspan="{{col.cols}}" x="{{x}}" y="{{y}}"><div ng-if="col.isempty">+</div><div ng-if="!col.imgurl && !col.isempty">{{col.cols * 160}} * {{col.rows * 160}}</div><div ng-if="!col.isempty && col.imgurl"><img ng-src="{{col.imgurl}}" width="{{col.cols * 60}}" height="{{col.rows * 60}}"></div></td></tr></table><span class="help-block">点击"+",添加内容</span><img ng-src="{{col.imgurl}}" width="{{col.cols * 60}}" height="{{col.cols * 60}}"></div></div><div ng-show="activeItem.params.currentLayout.isempty == false" class="add-cube-item card clearfix"><div class="btns"><a href="#"><i class="fa fa-times"></i></a></div><div class="form-group"><label class="control-label col-xs-3"><span class="red">*</span>选择图片</label><div class="col-xs-9"><div style="width:50px; height:50px; overflow:hidden; float:left; margin-right:10px"><img ng-src="{{activeItem.params.currentLayout.imgurl}}" id="thumb"></div><span ng-click="addItem()"><i class="fa fa-plus-circle green"></i>&nbsp;添加图片</span> <span class="help-block">建议尺寸：{{activeItem.params.currentLayout.cols * 160}} * {{activeItem.params.currentLayout.rows * 160}} 像素</span></div></div><div class="form-group"><label class="control-label col-xs-3">链接</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="activeItem.params.currentLayout.url" ng-my-title="activeItem.params.currentLayout.title"></div></div></div></div></div></div></div></div><!--end魔方--><div id="modal-cube-layout" class="modal fade in" role="dialog" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h3>选择布局</h3></div><div class="modal-body text-center"><div class="layout-table"><ul class="layout-cols layout-rows-{{col.rows}} clearfix" ng-repeat="row in activeItem.params.selection"><li data-cols="{{col.cols}}" data-rows="{{col.rows}}" ng-click="selectLayout(activeItem.params.currentPos.row, activeItem.params.currentPos.col, col.rows, col.cols)" ng-repeat="col in row"></li></ul></div></div></div></div></div></div>'), a.put("widget-header-display.html", '<div ng-controller="headerCtrl"><div class="title js-default-content"><h1><span>{{module.params.title}}</span></h1></div></div>'), a.put("widget-header-editor.html", '<div ng-controller="headerCtrl"><!--页面标题设置--><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 页面名称</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.title" placeholder="微页面标题" class="form-control"></div></div><div class="form-group"><label class="col-xs-3 control-label">页面描述</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.description" placeholder="用户通过微信分享给朋友时,会自动显示页面描述" class="form-control"></div></div><div class="form-group"><label class="col-xs-3 control-label">触发关键字</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.keyword" class="form-control"> <span class="help-block">用户触发关键字，系统回复此页面的图文链接.不支持多关键字</span></div></div><div class="form-group"><label class="control-label col-xs-3"><span class="red">*</span>封面</label><div class="col-xs-9"><span ng-click="addThumb(\'thumb\')"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.thumb"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.thumb}}"> <em ng-click="activeItem.params.thumb = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div><span class="help-block">用于用户触发关键字后，系统回复时的封面图片</span></div></div><div class="form-group"><label class="col-xs-3 control-label">页面颜色</label><div class="col-xs-9"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.bgColor" ng-my-default-color=""></div></div><span class="help-block">背景颜色只在手机端显示</span></div></div></div></div></div></div></div>'), a.put("widget-line-display.html", '<div ng-controller="lineCtrl"><!--app辅助线--><div class="app-line"><div class="inner"><hr></div></div><!--end 辅助线--></div>'), a.put("widget-line-editor.html", '<div ng-controller="lineCtrl"><!--辅助线--><div class="app-line-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body">辅助线</div></div></div></div><!--end 辅助线--></div>'), a.put("widget-link-display.html", '<div ng-controller="linkCtrl"><!--app关联链接--><div class="app-link js-default-content" ng-if="module.params.items.length == 0"><div class="inner"><div class="list-group"><div class="list-group-item"><a class="clearfix" href="javascript:;"><span class="app-nav-title">点此编辑第1条『关联链接』<i class="pull-right fa fa-angle-right"></i></span></a></div><div class="list-group-item"><a class="clearfix" href="javascript:;"><span class="app-nav-title">点此编辑第2条『关联链接』<i class="pull-right fa fa-angle-right"></i></span></a></div><div class="list-group-item"><a class="clearfix" href="javascript:;"><span class="app-nav-title">点此编辑第n条『关联链接』<i class="pull-right fa fa-angle-right"></i></span></a></div></div></div></div><div ng-if="module.params.items.length != 0"><!--app文本导航--><div class="app-textNav"><div class="inner"><div class="list-group"><div ng-repeat="item in module.params.items"><div ng-if="item.type == \'1\' && (item.selectCate.pid > 0 || item.selectCate.cid > 0)"><div class="list-group-item" ng-repeat="i in pageSize | limitTo:item.pageSize"><a class="clearfix" href="javascript:;"><span class="app-nav-title">第{{$index+1}}条 {{item.selectCate.name}} 的『关联链接』<i class="pull-right fa fa-angle-right"></i></span></a></div></div><div class="list-group-item" ng-if="item.type == \'2\'"><a class="clearfix" href="{{item.url}}"><span class="app-nav-title">{{item.title}} <i class="pull-right fa fa-angle-right"></i></span></a></div></div></div></div></div><!--end文本导航--></div></div>'), a.put("widget-link-editor.html", '<div ng-controller="linkCtrl"><!--文本导航--><div class="app-textNav-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="card add-textNav-con" ng-repeat="item in activeItem.params.items"><div class="btns"><a href="javascript:" ng-click="addItem()"><i class="fa fa-plus"></i></a> <a href="javascript:" ng-click="removeItem(item)"><i class="fa fa-times"></i></a></div><div class="form-group"><label class="control-label col-xs-3"><span class="red">*</span> 数据来源</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" value="1" ng-model="item.type" name="link-type-{{$index+0}}">分类</label><label class="radio-inline"><input type="radio" value="2" ng-model="item.type" name="link-type-{{$index+0}}">自定义</label></div></div><div class="form-group" ng-show="item.type == 2"><label class="control-label col-xs-3"><span class="red">*</span> 导航名称</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-class="{\'red\': item.title == \'\'}" ng-model="item.title"></div></div><div class="form-group" ng-show="item.type == 2"><label class="control-label col-xs-3"><span class="red">*</span> 链接到</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="item.url" ng-my-title="item.title"></div></div></div><div class="form-group" ng-show="item.type == 1"><label class="control-label col-xs-3"><span class="red">*</span>内容来源</label><div class="col-xs-9"><div class="input-group"><!--链接选择好以后显示以下内容--><div class="form-control-static"><label ng-if="item.selectCate.id != 0" class="label label-success">{{item.selectCate.name}}</label><a href="javascript:;" ng-click="showSearchCateList(item)"><span ng-if="item.selectCate.id == 0">从分类中选择</span><span ng-if="item.selectCate.id != 0">修改</span></a></div></div></div></div><div class="form-group" ng-show="item.type == 1"><label class="control-label col-xs-3">文章属性</label><div class="col-xs-9"><label class="checkbox-inline"><input type="checkbox" ng-model="item.isnew" value="1" name="attribute">最新</label><label class="checkbox-inline"><input type="checkbox" ng-model="item.iscommend" value="1" name="attribute">推荐</label><label class="checkbox-inline"><input type="checkbox" ng-model="item.ishot" value="1" name="attribute">头条</label></div></div><div class="form-group" ng-show="item.type == 1"><label class="control-label col-xs-3">显示条数</label><div class="col-xs-9"><select class="form-control" ng-model="item.pageSize" ng-change="changePageSize(item)"><option value="1">1条</option><option value="2">2条</option><option value="3">3条</option><option value="4">4条</option><option value="5">5条</option><option value="10">10条</option><option value="15">15条</option><option value="20">20条</option><option value="30">30条</option></select></div></div></div><div class="add-textNav card"><a href="javascript:" ng-click="addItem()"><i class="fa fa-plus-circle green"></i> 添加一个导航</a></div></div></div></div></div><!--end文本导航--><div id="modal-search-cate-link" class="modal fade in" role="dialog" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">+</button><h3>选择分类</h3></div><div class="modal-body"><table class="table table-hover"><thead class="navbar-inner"><tr><th style="width:60%">标题</th><th style="width:30%; text-align:right"><div class="input-group input-group-sm"><input type="text" class="form-control js-search-cate-keyword"> <span class="input-group-btn"><button ng-click="showSearchCateList(currentItem)" class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></th></tr></thead><tbody ng-repeat="pcate in searchCateList"><tr><td><a href="#">{{pcate.name}}</a></td><td class="text-right"><a class="btn btn-default btn-sm" ng-click="selectCateItem(pcate.id, 0, pcate.name)">选取</a></td></tr><tr ng-repeat="ccate in pcate.children track by $index"><td style="padding-left:50px;height:30px;line-height:30px;background-image:url(\'./resource/images/bg_repno.gif\'); background-repeat:no-repeat; background-position: -245px -540px"><a href="#">{{ccate.name}}</a></td><td class="text-right"><a class="btn btn-default btn-sm" ng-click="selectCateItem(0, ccate.id, ccate.name)">选取</a></td></tr></tbody></table></div></div></div></div></div>'), a.put("widget-navimg-display.html", '<div ng-controller="navImgCtrl"><!--app图片广告--><div class="app-nav"><div class="inner"><ul class="clearfix"><li ng-repeat="item in module.params.items"><a href="{{item.url}}"><span class="nav-img"><img ng-src="{{item.imgurl}}"></span> <span class="title" title="{{item.title}}">{{item.title}}</span></a></li></ul></div></div><!--end图片广告--></div>'), a.put("widget-navimg-editor.html", '<div ng-controller="navImgCtrl"><!--图片广告--><div class="app-nav-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div ng-repeat="item in activeItem.params.items"><div class="card nav-item clearfix"><div class="col-xs-3 img" ng-if="item.imgurl == \'\'"><span ng-click="changeItem(item)"><i class="fa fa-plus-circle green"></i>&nbsp;添加图片</span></div><div class="col-xs-3 img" ng-if="item.imgurl != \'\'"><h3 ng-click="changeItem(item)">重新上传</h3><img ng-src="{{ item.imgurl }}"></div><div class="col-xs-9"><div class="form-group"><label class="control-label col-xs-3">文字</label><div class="col-xs-9"><input name="title" ng-model="item.title" class="form-control" typel="text" placeholder="文字"></div></div><div class="form-group"><label class="control-label col-xs-3">链接</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="item.url" ng-my-title="item.title"></div></div></div></div></div></div></div></div></div></div><!--end图片广告--></div>'), a.put("widget-notice-display.html", '<div ng-controller="noticeCtrl"><!--app公告--><div class="app-notice"><div class="inner"><div class="notice-box"><div class="scrollNotice"><span class="js-scroll-notice">公告: {{module.params.notice || \'请填写内容,如果过长,将会在手机上滚动显示!\'}}</span></div></div></div></div><!--end 公告--></div>'), a.put("widget-notice-editor.html", '<div ng-controller="noticeCtrl"><!--公告--><div class="app-notice-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group" style="margin-bottom:0"><label class="col-xs-2 control-label">公告</label><div class="col-xs-10"><input type="text" ng-model="activeItem.params.notice" value="" class="form-control" placeholder="请填写内容,如果过长,将会在手机上滚动显示"></div></div></div></div></div></div><!--end 公告--></div>'), a.put("widget-richtext-display.html", '<div ng-controller="richTextCtrl"><!--富文本--><div class="app-richText" ng-style="{\'background-color\' : module.params.bgColor}"><div class="inner" ng-style="{\'padding\' : module.params.isfull ? \'0\' : \'10px\'}" ng-bind-html="trustAsHtml(module.params.content)" ng-if="module.params.content"></div><div class="inner js-default-content" ng-if="!module.params.content"><p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行 <strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline">下划线</span>、 <span style="text-decoration: line-through">删除线</span>、文字<span style="color: rgb(0, 176, 240)">颜色</span>、 <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255)">背景色</span>、 以及字号<span style="font-size: 20px">大</span><span style="font-size: 14px">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table class="table-bordered"><tbody><tr><td>中奖客户</td><td>发放奖品</td><td>备注</td></tr><tr><td>猪猪</td><td>内测码</td><td><em><span class="red">已经发放</span></em></td></tr><tr><td>大麦</td><td>积分</td><td><a href="#" target="_blank">领取地址</a></td></tr></tbody></table><p style="text-align: left"><span style="text-align: left">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p></div></div><!--end富文本--></div>'), a.put("widget-richtext-editor.html", '<div ng-controller="richTextCtrl"><!--富文本--><div class="app-richText-edit"><div class="arrow-left"></div><div class="app-header-setting-new-inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label">背景颜色</label><div class="col-xs-9"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.bgColor" ng-my-default-color="\'#ffffff\'"></div></div></div></div><div class="form-group"><label class="col-xs-3 control-label">是否全屏</label><div class="col-xs-9"><label for="fullScreen" class="checkbox-inline"><input id="fullScreen" name="fullScreen" type="checkbox" ng-model="activeItem.params.isfull">全屏显示</label></div></div><div class="form-group"><div class="col-xs-12"><div ng-my-editor ng-my-value="activeItem.params.content"></div></div></div></div></div></div></div><!--end富文本--></div>'), a.put("widget-textnav-display.html", '<div ng-controller="textNavCtrl"><!--app文本导航--><div class="app-textNav"><div class="inner"><div class="list-group mnav-box"><div class="list-group-item" ng-repeat="item in module.params.items"><a class="clearfix" href="{{item.url}}"><span class="app-nav-title">{{item.title}}<i class="pull-right fa fa-angle-right"></i></span></a></div></div></div></div><!--end文本导航--></div>'), a.put("widget-textnav-editor.html", '<div ng-controller="textNavCtrl"><!--文本导航--><div class="app-textNav-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="card add-textNav-con" ng-repeat="item in activeItem.params.items"><div class="btns"><a href="javascript:" ng-click="addItem()"><i class="fa fa-plus"></i></a> <a href="javascript:" ng-click="removeItem(item)"><i class="fa fa-times"></i></a></div><div class="form-group"><label class="control-label col-xs-3"><span class="red">*</span> 导航名称</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-class="{\'red\': item.title == \'\'}" ng-model="item.title" value=""></div></div><div class="form-group"><label class="control-label col-xs-3"><span class="red">*</span> 链接到</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="item.url" ng-my-title="item.title"></div></div></div></div><div class="add-textNav card"><a href="javascript:" ng-click="addItem()"><i class="fa fa-plus-circle green"></i> 添加一个文本导航</a></div></div></div></div></div><!--end文本导航--></div>'), a.put("widget-title-display.html", '<div ng-controller="titleCtrl"><!--app标题--><div class="app-title"><div class="inner"><!--传统样式--><!--居左:text-left	居右:text-right	 居中:text-center--><div ng-if="module.params.template == 1" class="title-detail tradition" style="text-align: {{module.params.tradition.align}}; background:{{module.params.tradition.bgcolor}};/*背景颜色设置*/"><h2 class="title-con">{{ module.params.title || "点击编辑『标题』"}}<span ng-if="module.params.tradition.nav.enable == 1" class="title-link">- <a href="{{module.params.tradition.nav.url}}" ng-bind="module.params.tradition.nav.title">文本导航</a></span></h2><p class="sub-title" ng-bind="module.params.tradition.subtitle">副标题</p></div><!--仿微信样式--><div ng-if="module.params.template == 2" class="title-detail text-left wx"><h2 class="title-con">{{ module.params.title || "点击编辑『标题』"}}</h2><p class="sub-title"><span class="date" ng-bind="module.params.news.date">2015-03-12</span>&nbsp;&nbsp;<span class="author" ng-bind="module.params.news.author">zhangsan</span>&nbsp;&nbsp;<span><a href="{{module.params.news.url}}" ng-bind="module.params.news.title">九宫格团队</a></span></p></div></div></div><!--end标题--></div>'), a.put("widget-title-editor.html", '<div ng-controller="titleCtrl"><!--标题--><div class="app-title-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 标题名</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-model="activeItem.params.title" value=""></div></div><div class="form-group"><label class="control-label col-xs-3">标题模板</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" name="title-style" ng-model="activeItem.params.template" value="1" class="tradition">传统样式</label><label class="radio-inline"><input type="radio" name="title-style" ng-model="activeItem.params.template" value="2" class="wx">模仿微信图文页样式</label></div></div><!--传统--><div class="form-group" ng-if="activeItem.params.template == 1"><label class="col-xs-3 control-label">副标题</label><div class="col-xs-6"><input type="text" class="form-control" ng-model="activeItem.params.tradition.subtitle" value=""></div><div class="col-xs-3 form-control-static"><span class="date"><a href="javascript:;" ng-my-date-picker ng-my-date-value="activeItem.params.tradition.subtitle">日期</a></span></div></div><div class="form-group" ng-if="activeItem.params.template == 1"><label class="control-label col-xs-3">显示</label><div class="col-xs-9"><label class="radio-inline"><input type="radio" name="tra-style" value="left" ng-model="activeItem.params.tradition.align">居左显示</label><label class="radio-inline"><input type="radio" name="tra-style" value="center" ng-model="activeItem.params.tradition.align">居中显示</label><label class="radio-inline"><input type="radio" name="tra-style" value="right" ng-model="activeItem.params.tradition.align">居右显示</label></div></div><div class="form-group" ng-if="activeItem.params.template == 1"><label class="col-xs-3 control-label">背景颜色</label><div class="col-xs-9"><div class="input-group"><div ng-my-colorpicker ng-my-color="activeItem.params.tradition.bgcolor" ng-my-default-color="\'#ffffff\'"></div></div></div></div><div class="add-textNav card" ng-if="activeItem.params.template == 1 && activeItem.params.tradition.nav.enable == 0"><a href="javascript:" ng-click="changeNavEnable(1)"><i class="fa fa-plus-circle green"></i> 添加一个文本导航</a></div><div class="card" style="padding:20px" ng-if="activeItem.params.template == 1 && activeItem.params.tradition.nav.enable == 1"><div class="btns"><a href="javascript:" ng-click="changeNavEnable(0)"><i class="fa fa-times"></i></a></div><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 名称</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-model="activeItem.params.tradition.nav.title" value=""></div></div><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 链接</label><div class="col-xs-9 form-control-static"><div ng-my-linker ng-my-url="activeItem.params.tradition.nav.url" ng-my-title="activeItem.params.tradition.nav.title"></div></div></div></div><!--仿微信样式--><div class="form-group" ng-if="activeItem.params.template == 2"><label class="col-xs-3 control-label">日期</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-my-date-picker ng-my-date-value="activeItem.params.news.date" value=""></div></div><div class="form-group" ng-if="activeItem.params.template == 2"><label class="col-xs-3 control-label">作者</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-model="activeItem.params.news.author" value=""></div></div><div class="form-group" ng-if="activeItem.params.template == 2"><label class="col-xs-3 control-label">链接标题</label><div class="col-xs-9"><input type="text" class="form-control" name="" ng-model="activeItem.params.news.title" value=""></div></div><div class="form-group" ng-if="activeItem.params.template == 2"><label class="control-label col-xs-3">链接地址</label><div class="col-xs-9"><div ng-my-linker ng-my-url="activeItem.params.news.url" ng-my-title="activeItem.params.news.title"></div></div></div></div></div></div></div><!--end标题--></div>'), a.put("widget-ucheader-display.html", '<div ng-controller="headerCtrl"><div class="title"><h1><span>{{module.params.title}}</span></h1></div><div class="head" style="background-repeat:no-repeat; background-position: center center" ng-style="{\'background-image\' : module.params.bgImage ? \'url(\' + module.params.bgImage + \')\' : \'url(\\\'./resource/images/app/head-bg.png\\\')\'}"><a class="ptool" href="{{url(\'mc/profile\')}}"><i class="fa fa-cog fa-spin"></i></a><div class="pdetail"><div class="img-circle"><img src="/statics/app/resource/images/heading.jpg"></div><div class="pull-left"><span class="name"><a href="javascript:;" style="color:red">设置昵称</a></span> <span class="type"><i class="fa fa-certificate"></i> 默认会员组</span> <span class="type"><i class="fa fa-flag-o"></i> 会员UID: 8888</span></div></div><div class="head-nav"><a class="head-nav-list" href="{{url(\'activity/coupon/mine\')}}">折扣券<span>5</span></a> <a class="head-nav-list" href="{{url(\'activity/token/mine\')}}">代金券<span>7</span></a> <a class="head-nav-list" href="{{url(\'mc/bond/credits\')}}&credittype=credit2">积分<span>900.00</span></a> <a class="head-nav-list" href="{{url(\'mc/bond/credits\')}}&credittype=credit1">余额<span>4000.00</span></a></div></div></div>'), a.put("widget-ucheader-editor.html", '<div ng-controller="headerCtrl"><!--页面标题设置--><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 页面名称</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.title" placeholder="微页面标题" class="form-control"></div></div><div class="form-group"><label class="control-label col-xs-3">背景图片</label><div class="col-xs-9"><span ng-click="addThumb(\'bgImage\')"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.bgImage"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.bgImage}}"> <em ng-click="activeItem.params.bgImage = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div></div></div><div class="form-group"><label class="col-xs-3 control-label">触发关键字</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.keyword" class="form-control"> <span class="help-block">用户触发关键字，系统回复此页面的图文链接</span></div></div><div class="form-group"><label class="control-label col-xs-3">封面</label><div class="col-xs-9"><span ng-click="addThumb(\'cover\')"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.cover"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.cover}}"> <em ng-click="activeItem.params.cover = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div><span class="help-block">用于用户触发关键字后，系统回复时的封面图片</span></div></div><div class="form-group"><label class="col-xs-3 control-label">页面描述</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.description" class="form-control"></div></div><div class="shopNav-edit-header clearfix">个人中心扩展菜单</div><!--微信公众号自定义菜单模板:shopNav-wx--><div class="shopNav-wx"><div class="card" ng-repeat="menu in activeMenus"><div class="btns"><a href="javascript:;" ng-click="removeMenu(menu)"><i class="fa fa-times"></i></a></div><div class="nav-region"><div class="first-nav"><div class="alert"><div class="form-group"><label class="control-label col-xs-3">标题</label><div class="col-xs-9"><div class="input-group"><input type="text" class="form-control" name="" value="" ng-model="menu.name"> <span class="input-group-btn"><button ng-click="showIconBrowser(menu)" type="button" class="btn btn-default">选择图标</button></span></div></div></div><div class="form-group"><label class="control-label col-xs-3">链接到</label><div class="col-xs-9"><div ng-my-linker ng-my-url="menu.url" ng-my-title="menu.name"></div></div></div></div></div></div></div><div class="add-shopNav text-center" ng-click="addMenu();">+添加一级导航</div><!--最多添加三个导航--></div><!--end微信公众号自定义菜单模板--></div></div></div></div></div>'), a.put("widget-usercard-display.html", ""), a.put("widget-usercard-editor.html", ""), a.put("widget-usercenter-display.html", '<div ng-controller="headerCtrl"><div class="title"><h1><span>{{module.params.title}}</span></h1></div><div class="head" style="background-repeat:no-repeat; background-position: center center" ng-style="{\'background-image\' : module.params.bgImage ? \'url(\' + module.params.bgImage + \')\' : \'url(\\\'./resource/images/app/head-bg.png\\\')\'}"><a class="ptool" href="{{url(\'mc/profile\')}}"><i class="fa fa-cog fa-spin"></i></a><div class="pdetail"><div class="img-circle"><img src="/statics/app/resource/images/heading.jpg"></div><div class="pull-left"><span class="name"><a href="javascript:;" style="color:red">设置昵称</a></span> <span class="type"><i class="fa fa-certificate"></i> 默认会员组</span> <span class="type"><i class="fa fa-flag-o"></i> 会员UID: 8888</span></div></div><div class="head-nav"><a class="head-nav-list" href="{{url(\'activity/coupon/mine\')}}">折扣券<span>5</span></a> <a class="head-nav-list" href="{{url(\'activity/token/mine\')}}">代金券<span>7</span></a> <a class="head-nav-list" href="{{url(\'mc/bond/credits\')}}&credittype=credit2">积分<span>900.00</span></a> <a class="head-nav-list" href="{{url(\'mc/bond/credits\')}}&credittype=credit1">余额<span>4000.00</span></a></div></div></div>'), a.put("widget-usercenter-editor.html", '<div ng-controller="headerCtrl"><!--页面标题设置--><div class="app-header-setting"><div class="arrow-left"></div><div class="app-header-setting-inner"><div class="panel panel-default"><div class="panel-body form-horizontal"><div class="form-group"><label class="col-xs-3 control-label"><span class="red">*</span> 页面名称</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.title" placeholder="微页面标题" class="form-control"></div></div><div class="form-group"><label class="control-label col-xs-3">背景图片</label><div class="col-xs-9"><span ng-click="addThumb(\'bgImage\')"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.bgImage"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.bgImage}}"> <em ng-click="activeItem.params.bgImage = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div></div></div><div class="form-group"><label class="col-xs-3 control-label">触发关键字</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.keyword" class="form-control"> <span class="help-block">用户触发关键字，系统回复此页面的图文链接</span></div></div><div class="form-group"><label class="control-label col-xs-3">封面</label><div class="col-xs-9"><span ng-click="addThumb(\'cover\')"><i class="fa fa-plus-circle green"></i>&nbsp;选择图片</span><div style="margin-top:.5em" class="input-group" ng-show="activeItem.params.cover"><img width="150" class="img-responsive img-thumbnail" ng-src="{{activeItem.params.cover}}"> <em ng-click="activeItem.params.cover = \'\';" title="删除这张图片" style="position:absolute; top: 0px; right: -14px" class="close">×</em></div><span class="help-block">用于用户触发关键字后，系统回复时的封面图片</span></div></div><div class="form-group"><label class="col-xs-3 control-label">页面描述</label><div class="col-xs-9"><input type="text" ng-model="activeItem.params.description" class="form-control"></div></div><div class="shopNav-edit-header clearfix">个人中心扩展菜单</div><!--微信公众号自定义菜单模板:shopNav-wx--><div class="shopNav-wx"><div class="card" ng-repeat="menu in activeMenus"><div class="btns"><a href="javascript:;" ng-click="removeMenu(menu)"><i class="fa fa-times"></i></a></div><div class="nav-region"><div class="first-nav"><div class="alert"><div class="form-group"><label class="control-label col-xs-3">标题</label><div class="col-xs-9"><div class="input-group"><input type="text" class="form-control" name="" value="" ng-model="menu.name"> <span class="input-group-btn"><button ng-click="showIconBrowser(menu)" type="button" class="btn btn-default">选择图标</button></span></div></div></div><div class="form-group"><label class="control-label col-xs-3">链接到</label><div class="col-xs-9"><div ng-my-linker ng-my-url="menu.url" ng-my-title="menu.name"></div></div></div></div></div></div></div><div class="add-shopNav text-center" ng-click="addMenu();">+添加一级导航</div><!--最多添加三个导航--></div><!--end微信公众号自定义菜单模板--></div></div></div></div></div>'),
				a.put("widget-white-display.html", '<div ng-controller="whiteCtrl"><!--app辅助空白--><div class="app-white"><div class="inner" style="height:{{module.params.height}}px;min-height:{{module.params.height}}px;overflow:hidden;padding:0px"></div></div><!--end辅助空白--></div>'), a.put("widget-white-editor.html", '<div ng-controller="whiteCtrl"><!--辅助空白--><div class="app-white-edit"><div class="arrow-left"></div><div class="inner"><div class="panel panel-default"><div class="panel-body"><div class="form-group"><label class="control-label col-xs-3">空白高度</label><div class="col-xs-6"><div class="slider"><div class="slider-bar"></div></div></div><div class="col-xs-3">{{activeItem.params.height}}像素</div></div></div></div></div></div><!--辅助空白--></div>')
		}]),
		function(a, b) {
			a["colorpicker-template"] = '<div class="input-group"><input type="text" name="" value="" ng-model="colorValue" class="form-control"><span class="input-group-addon" style="width:35px; border-left:none" ng-style="{\'background-color\' : colorValue}"></span> <span class="input-group-btn"><button class="btn btn-default colorpicker" type="button">选择颜色 <i class="fa fa-caret-down"></i></button> <button class="btn btn-default colorclean" type="button"><span><i class="fa fa-remove"></i></span></button></span></div>', a["iconer-nav-pills"] = '<li id="li_icon" role="presentation"><a href="#icon" aria-controls="icon" role="tab" data-toggle="tab">图标</a></li>', a["iconer-tab-content"] = '<div id="icon" class="tab-pane icon form-horizontal" role="tabpanel"><div class="form-group" style="border-bottom:1px solid #e5e5e5; padding:0 0 15px 0; margin:10px 0 0 0"><label class="col-xs-3 control-label">图标颜色</label><div class="col-xs-9"><input type="color" value="" class="form-control" id="iconcolor" onchange="$(this).parents(\'#icon\').attr(\'color\', this.value);$(this).parents(\'#icon\').find(\'i\').css(\'color\', this.value)"></div></div></div>', a["iconer-template"] = '<div class="nav-img-box" style="background-color: #2B2D30"><div class="btns"><a style="height:19px" ng-click="removeIcon()" href="javascript:;"><i class="fa fa-times"></i></a></div><div class="nav-img" ng-style="{\'background-image\': image ? \'url(\'+image+\')\' : \'\'}"><i ng-hide="menu.image" class="fa" ng-style="{\'color\' : icon.color}" ng-class="icon.name"></i></div><a href="javascript:;" ng-click="selectIcon()"><span ng-transclude=""></span></a></div>', a["linker-cms-article-item"] = '<%_.each(items, function(item) {%><tr><td><a href="#" data-cover-attachment-url="<%=item.attachment%>" title="<%=item.title%>"><%=item.title%></a></td><td><%=item.createtime%></td><td class="text-right"><button class="btn btn-default js-btn-select" js-url="./index.php?c=site&a=site&do=detail&id=<%=item.id%>&i=<%=item.uniacid%>" js-title="<%=item.title%>">选取</button></td></tr><%});%>', a["linker-cms-cate-item"] = '<%_.each(items, function(item) {%><tr><td colspan="2"><a href="#"><%=item.name%></a></td><td class="text-right"><a class="btn btn-default js-btn-select" js-url="./index.php?c=site&a=site&cid=<%=item.id%>&i=<%=item.uniacid%>" js-title="<%=item.name%>">选取</a></td></tr><%_.each(item.children, function(child) {%><tr><td colspan="2" style="padding-left:50px;height:30px;line-height:30px;background-image:url(\\\'./resource/images/bg_repno.gif\\\'); background-repeat:no-repeat; background-position: -245px -540px"><a href="#"><%=child.name%></a></td><td class="text-right"><a class="btn btn-default js-btn-select" js-url="./index.php?c=site&a=site&cid=<%=child.id%>&i=<%=child.uniacid%>" js-title="<%=child.name%>">选取</a></td></tr><%});%><%});%>', a["linker-cms-content"] = '<div class="tab-content"><div id="articlelist" class="tab-pane active" role="tabpanel"><table class="table table-hover"><thead class="navbar-inner"><tr><th style="width:40%">标题</th><th style="width:30%">创建时间</th><th style="width:30%; text-align:right"><div class="input-group input-group-sm"><input type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></th></tr></thead><tbody></tbody></table><div id="pager" style="text-align:center"></div></div><div id="category" class="tab-pane" role="tabpanel"><table class="table table-hover"><thead class="navbar-inner"><tr><th style="width:40%">标题</th><th style="width:30%">创建时间</th><th style="width:30%; text-align:right"><div class="input-group input-group-sm"><input type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></th></tr></thead><tbody></tbody></table><div id="pager" style="text-align:center"></div></div></div>', a["linker-cms-header"] = '<ul role="tablist" class="nav nav-pills" style="font-size:14px; margin-top:-20px"><li role="presentation" class="active" id="li_goodslist"><a data-toggle="tab" role="tab" aria-controls="articlelist" href="#articlelist">文章</a></li><li role="presentation" class="" id="li_category"><a data-toggle="tab" role="tab" aria-controls="category" href="#category">分类</a></li></ul>', a["linker-map-content"] = '<div class="model-dialog"><div class="model-content"><div class="modal-header"><h4 class="modal-title" id="myModalLabel">一键导航</h4></div><div class="modal-body"><form action="" class="form-horizontal" role="form" enctype="multipart/form-data"><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 col-lg-2 control-label"><span style="font-size:16px">标题</span></label><div class="col-sm-9 col-xs-12"><input type="text" id="navtitle" class="form-control" name="navtitle" value=""></div></div><div class="form-group"><label class="col-xs-12 col-sm-3 col-md-2 col-lg-2 control-label"><span style="font-size:16px">地理位置</span></label><div class="col-sm-9 col-xs-12"><div class="row row-fix"><div class="col-xs-4 col-sm-4"><input type="text" name="navtitle[lng]" id="navlng" value="" placeholder="地理经度" class="form-control"></div><div class="col-xs-4 col-sm-4"><input type="text" name="navtitle[lat]" id="navlat" value="" placeholder="地理纬度" class="form-control"></div><div class="col-xs-4 col-sm-4"><button onclick="showCoordinate(this)" class="btn btn-default" type="button">选择坐标</button></div></div><script type="text/javascript">function showCoordinate(elm) {\n					require(["util"], function(util){\n						var val = {};\n						val.lng = parseFloat($(elm).parent().prev().prev().find(":text").val());\n						val.lat = parseFloat($(elm).parent().prev().find(":text").val());\n						util.map(val, function(r){\n						$(elm).parent().prev().prev().find(":text").val(r.lng);\n					$(elm).parent().prev().find(":text").val(r.lat);\n						});\n					});\n				  };</script></div></div></form></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" id="getnav">确定</button></div></div>', a["linker-news-content"] = '<div id="newslist" class="tab-pane active" role="tabpanel"><table class="table table-hover"><thead class="navbar-inner"><tr><th style="width:40%">标题</th><th style="width:30%">创建时间</th><th style="width:30%; text-align:right"><div class="input-group input-group-sm"><input type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></th></tr></thead><tbody></tbody></table><div id="pager" style="text-align:center"></div></div>', a["linker-news-item"] = '<%_.each(items, function(item) {%><tr><td><a href="#" data-cover-attachment-url="<%=item.attachment%>" title="<%=item.title%>"><%=item.title%></a></td><td><%=item.createtime%></td><td class="text-right"><button class="btn btn-default js-btn-select" js-url="./index.php?i=<%=item.uniacid%>&c=entry&id=<%=item.id%>&do=detail&m=news" js-title="<%=item.title%>">选取</button></td></tr><%});%>', a["linker-page-content"] = '<div id="pageList" class="tab-pane active" role="tabpanel"><table class="table table-hover"><thead class="navbar-inner"><tr><th style="width:40%">名称</th><th style="width:30%">创建间</th><th style="width:30%; text-align:right"><div class="input-group input-group-sm"><input type="text" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span></div></th></tr></thead><tbody></tbody></table><div id="pager" style="text-align:center"></div></div>', a["linker-page-item"] = '<%_.each(items, function(item) {%><tr><td><a href="#" title="<%=item.title%>"><%=item.title%></a></td><td><%=item.createtime%></td><td class="text-right"><button class="btn btn-default js-btn-select" js-url="./index.php?i=<%=item.uniacid%>&c=home&a=page&pageid=<%=item.id%>" js-title="<%=item.title%>">选取</button></td></tr><%});%>', a["linker-template"] = '<div class="dropdown link"><div class="input-group"><input type="text" value="" placeholder="链接地址:http://example.com" ng-model="url" class="form-control"><span class="input-group-btn"><button class="btn btn-default" type="button" onclick="">选择链接 <i class="fa fa-caret-down"></i></button></span></div><ul class="dropdown-menu" role="menu" style="left: 0; right:0"><li><a href="javascript:;" ng-click="searchSystemLinker()">系统菜单</a></li><li><a href="javascript:;" ng-click="searchPageLinker()">微页面</a></li><li><a href="javascript:;" ng-click="searchCmsLinker()">文章及分类</a></li><li><a href="javascript:;" ng-click="searchNewsLinker()">图文回复</a></li><li><a href="javascript:;" ng-click="searchMapPosLinker()">一键导航</a></li></ul></div>'
		}(this.window.WAPEDITOR.templates = this.window.WAPEDITOR.templates || {})
});