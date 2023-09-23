var size = 15
var size2 = size * 2
var zbl = 8
var zbml = 2
var zbxl = 0
var x1 = 0
var x2 = 0
var x3 = 0
var z1 = 0
var z2 = 0
var z3 = 0
var touchInnerX = 0
var touchInnerZ = 0
var zbxs = []
var zbzs = []
var valueTds = []
var isShow = false
var moveSize = 8
var isPutDown = false
var blockSize = 22
$(function() {
	visit()
	init()
	$(document).keydown(function(event) {
		//console.log(event.keyCode);
		var keyCode = event.keyCode || event.which || event.charCode;
		var ctrlKey = event.ctrlKey || event.metaKey;
		if (keyCode == 13) {
			quiteSlimeChunk2()
		}
		if (!isShow) {
			return
		}
		if (keyCode == 37) {
			//鈫�;
			if (ctrlKey) {
				x1 = x1 - moveSize
				x2 = x2 - moveSize
				x3 = x3 - moveSize
			} else {
				x1--
				x2--
				x3--
			}
			setXZ()
			getValue()
			event.preventDefault();
			return false;
		} else if (keyCode == 38) {
			//鈫�;
			if (ctrlKey) {
				z1 = z1 - moveSize
				z2 = z2 - moveSize
				z3 = z3 - moveSize
			} else {
				z1--
				z2--
				z3--
			}
			setXZ()
			getValue()
			event.preventDefault();
			return false;
		} else if (keyCode == 39) {
			//鈫�;
			if (ctrlKey) {
				x1 = x1 + moveSize
				x2 = x2 + moveSize
				x3 = x3 + moveSize
			} else {
				x1++
				x2++
				x3++
			}
			setXZ()
			getValue()
			event.preventDefault();
			return false;
		} else if (keyCode == 40) {
			//鈫�;
			if (ctrlKey) {
				z1 = z1 + moveSize
				z2 = z2 + moveSize
				z3 = z3 + moveSize
			} else {
				z1++
				z2++
				z3++
			}
			setXZ()
			getValue()
			event.preventDefault();
			return false;
		}
	});
	// 鑾峰彇DOM鍏冪礌  
	let valueTable = document.getElementById("value");
	// 榧犳爣鎸変笅浜嬩欢 澶勭悊绋嬪簭
	let putDown = function(event) {
		isPutDown = true
		let innerX = event.clientX; // 鑾峰彇榧犳爣鍦ㄦ柟鍧楀唴鐨剎杞磋窛
		let innerZ = event.clientY; // 鑾峰彇榧犳爣鍦ㄦ柟鍧楀唴鐨剏杞磋窛
		$(".select").removeClass("select")
		if ($(event.target).hasClass("vv")) {
			$(event.target).addClass("select")
		};
		document.onmousemove = function(event) {
			let moveX = event.clientX - innerX
			let moveZ = event.clientY - innerZ
			let moveCX = parseInt(moveX / blockSize)
			let moveCZ = parseInt(moveZ / blockSize)
			if (moveCX != 0 || moveCZ != 0) {
				innerX = innerX + moveCX * blockSize
				innerZ = innerZ + moveCZ * blockSize
				x1 = x1 - moveCX
				x2 = x2 - moveCX
				x3 = x3 - moveCX
				z1 = z1 - moveCZ
				z2 = z2 - moveCZ
				z3 = z3 - moveCZ
				setXZ()
				getValue()
			}
		}
		// 榧犳爣鎶捣鏃讹紝娓呴櫎缁戝畾鍦ㄦ枃妗ｄ笂鐨刴ousemove鍜宮ouseup浜嬩欢
		document.onmouseup = function() {
			isPutDown = false
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
	// 缁戝畾榧犳爣鎸変笅浜嬩欢
	valueTable.addEventListener("mousedown", putDown, false);
	valueTable.ontouchstart = function(e) {
		e0=e.targetTouches[0]
		touchInnerX = e0.pageX; // 鑾峰彇榧犳爣鍦ㄦ柟鍧楀唴鐨剎杞磋窛
		touchInnerZ = e0.pageY; // 鑾峰彇榧犳爣鍦ㄦ柟鍧楀唴鐨剏杞磋窛
		$(".select").removeClass("select")
		if ($(e0.target).hasClass("vv")) {
			$(e0.target).addClass("select")
			var oDiv = document.getElementById('tipXZ');
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
			oDiv.style.left = e0.clientX + scrollLeft - 50 + 'px';
			oDiv.style.top = e0.clientY + scrollTop - 60 + 'px';
			$(e0.target).trigger('onmouseover');
		}else{
			hideXZ()
		}
		e.preventDefault();
	}
	
	valueTable.ontouchmove = function(e) {
		let moveX = e.targetTouches[0].pageX - touchInnerX
		let moveZ = e.targetTouches[0].pageY - touchInnerZ
		let moveCX = parseInt(moveX / blockSize)
		let moveCZ = parseInt(moveZ / blockSize)
		if (moveCX != 0 || moveCZ != 0) {
			touchInnerX = touchInnerX + moveCX * blockSize
			touchInnerZ = touchInnerZ + moveCZ * blockSize
			x1 = x1 - moveCX
			x2 = x2 - moveCX
			x3 = x3 - moveCX
			z1 = z1 - moveCZ
			z2 = z2 - moveCZ
			z3 = z3 - moveCZ
			setXZ()
			getValue()
		}
		e.preventDefault();
	}
	quiteSlimeChunk2()
});

function visit() {
	value = $("#value").text()
	$.ajax({
		type: "POST",
		url: "/visit/visit",
		async: true,
		dataType: "json"
	})
}

function isInt(i) {
	return i == '' || !Number.isInteger(Number(i))
}

function quiteSlimeChunk() {
	setTip("")
	seed = $("#seed").val()

	x1 = $("#x1").val()
	if (isInt(x1)) {
		setTip("鍧愭爣-x鏍煎紡閿欒")
		return
	}
	x1 = Math.floor(x1 / 16);

	x2 = $("#x2").val()
	if (isInt(x2)) {
		setTip("鍧愭爣+x鏍煎紡閿欒")
		return
	}
	x2 = Math.floor(x2 / 16);

	z1 = $("#z1").val()
	if (isInt(z1)) {
		setTip("鍧愭爣-z鏍煎紡閿欒")
		return
	}
	z1 = Math.floor(z1 / 16);

	z2 = $("#z2").val()
	if (isInt(z2)) {
		setTip("鍧愭爣+z鏍煎紡閿欒")
		return
	}
	z2 = Math.floor(z2 / 16);
	getValue()
};

function quiteSlimeChunk2() {
	setTip("")
	seed = $("#seed").val()

	x3 = $("#x3").val()
	if (isInt(x3)) {
		$("#x3").val(0)
		x3 = 0
	}
	x3 = Math.floor(x3 / 16);
	x1 = x3 - size;
	x2 = x3 + size;

	z3 = $("#z3").val()
	if (isInt(z3)) {
		$("#z3").val(0)
		z3 = 0
	}
	z3 = Math.floor(z3 / 16);
	z1 = z3 - size;
	z2 = z3 + size;

	getValue()
};

function getValue() {
	setTip("")
	if (x3 > 624999999) {
		setTip("鍧愭爣涓嶈兘澶т簬9999999999")
		x3 = 624999999
		setXZ()
		return
	}
	if (z3 > 624999999) {
		setTip("鍧愭爣涓嶈兘澶т簬9999999999")
		z3 = 624999999
		setXZ()
		return
	}
	if (x3 < -625000000) {
		setTip("鍧愭爣涓嶈兘灏忎簬-9999999999")
		x3 = -625000000
		setXZ()
		return
	}
	if (z3 < -625000000) {
		setTip("鍧愭爣涓嶈兘灏忎簬-9999999999")
		z3 = -625000000
		setXZ()
		return
	}
	if (seed === "") {
		getValueBE()
	} else {
		getValueJE()
	}
};

function getValueJE() {
	$.ajax({
		type: "GET",
		url: "/slimechunk/quiteSlimeChunk",
		data: {
			seed: seed,
			x1: x1,
			x2: x2,
			z1: z1,
			z2: z2,
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				setValue(data.data)
			} else if (data.code == 1) {
				setTip(data.message)
			}
		},
		error: function(response) {
			setTip("鏈嶅姟鍣ㄥ紓甯�")
			console.log(response);
		}
	})
};

function getValueBE() {
	setValue(quiteSlimeChunkBE(x1, x2, z1, z2))

	/*value = $("#value").text()
	$.ajax({
		type: "GET",
		url: "/slimechunkBE/quiteSlimeChunk",
		data: {
			x1: x1,
			x2: x2,
			z1: z1,
			z2: z2,
		},
		async: true,
		dataType: "json",
		success: function(data) {
			if (data.code == 0) {
				setValue(data.data)
			} else if (data.code == 1) {
				setTip(data.message)
			}
		},
		error: function(response) {
			setTip("鏈嶅姟鍣ㄥ紓甯�")
			console.log(response);
		}
	})*/
};

function init() {
	let line = ""
	//鍒涘缓x鍧愭爣杞�
	line = line + "<tr class='zuobiao'><td/>"
	zbxl = Math.ceil(size2 / zbl) + 1
	for (let i = 0; i < zbxl; i++) {
		if (i == zbxl - 1) {
			line = line + "<td id='zbx" + i + "' class='zuobiaoX' style='display: none;' colspan='" + zbl + "'></td>"
		} else {
			line = line + "<td id='zbx" + i + "' class='zuobiaoX' colspan='" + zbl + "'></td>"
		}
	}
	line = line + "<td id='lastx'></td>"
	line = line + "</tr><tr></tr>"
	//鍒涘缓z鍧愭爣杞�
	for (let i = 0; i < size2; i++) {
		line = line + "<tr class='lll'>"
		line = line + "<td id='zbz" + i + "' class='zuobiao zuobiaoY' valign='top'></td>"
		for (let j = 0; j < size2; j++) {
			line = line + "<td id='" + i + "_" + j + "' class='vv fv' onmouseover='showXZ(" + j + "," + i + ")'> </th>"
		}
		line = line + "<td id='" + i + "_" + size2 + "' class='vv rv fv' onmouseover='showXZ(" + size2 + "," + i + ")'> </th>"
		line = line + "</tr>"
	}
	line = line + "<tr class='lll'>"
	line = line + "<td id='zbz" + size2 + "' class='zuobiao zuobiaoY' valign='top'></td>"
	for (let j = 0; j < size2; j++) {
		line = line + "<td id='" + size2 + "_" + j + "' class='vv bv fv' onmouseover='showXZ(" + j + "," + size2 + ")'> </th>"
	}
	line = line + "<td id='" + size2 + "_" + size2 + "' class='vv rv bv fv' onmouseover='showXZ(" + size2 + "," + size2 + ")'> </th>"
	line = line + "</tr>"
	line = line + "<td id='lastz' class='zuobiao zuobiaoY'></td>"
	$("#value").html(line)
	//淇濆瓨x杞�
	for (let i = 0; i < zbxl; i++) {
		zbxs.push($("#zbx" + i))
	}
	lastx = $("#lastx")
	//淇濆瓨z杞�
	for (let i = 0; i < size2 + 1; i++) {
		zbzs.push($("#zbz" + i))
	}
	lastz = $("#lastz")
	//淇濆瓨鍧愭爣鐐�
	for (let i = 0; i < size2 + 1; i++) {
		valueTds.push([])
		for (let j = 0; j < size2 + 1; j++) {
			valueTds[i].push($("#" + i + "_" + j))
		}
	}
	valueTds[size][size].addClass("core")
}
function setValue(values) {
	$(".select").removeClass("select")
	//x鍧愭爣杞磋祴鍊�
	let xx = x1 % zbl
	if (xx >= 0) {
		zbxs[0].attr("colspan", zbl - xx)
	} else if (xx < 0) {
		zbxs[0].attr("colspan", -xx)
	}
	if ((x1 < 0 && Math.abs(x1) % zbl > zbml) || (x1 > 0 && x1 % zbl < zbl - zbml) || x1 % zbl == 0) {
		zbxs[0].html(x1 * 16)
	} else {
		zbxs[0].html("")
	}
	let xl = Number(x2) + 1
	let zbxi = 1
	for (let x = x1 + 1; x < xl; x++) {
		if (x % zbl == 0) {
			if (xl - x <= zbl) {
				zbxs[zbxi]
				zbxs[zbxi].show()
				zbxs[zbxi].attr("colspan", xl - x)
				if (xl - x > zbml) {
					zbxs[zbxi].html(x * 16)
				} else {
					zbxs[zbxi].html("")
				}
				if (zbxi < zbxl - 1) {
					zbxs[zbxi + 1].html("")
					zbxs[zbxi + 1].hide()
				}
				lastx.html(xl * 16)
				break
			} else {
				zbxs[zbxi].attr("colspan", zbl)
				zbxs[zbxi].html(x * 16)
			}
			zbxi++
			x += zbl - 1
		}
	}

	//z鍧愭爣杞磋祴鍊�
	zbzs[0].addClass('zuobiaoYShow')
	if ((z1 < 0 && Math.abs(z1) % zbl > zbml) || (z1 > 0 && z1 % zbl < zbl - zbml) || z1 % zbl == 0) {
		zbzs[0].html(z1 * 16)
	} else {
		zbzs[0].html("")
	}
	let zl = Number(z2) + 1
	for (let z = z1 + 1; z < zl; z++) {
		let i = z - z1
		if (z % zbl == 0) {
			zbzs[i - 1].addClass('zuobiaoYShow')
			if (zl - z > zbml) {
				zbzs[i].html(z * 16)
			} else {
				zbzs[i].html("")
			}
		} else {
			zbzs[i - 1].removeClass('zuobiaoYShow')
			zbzs[i].html("")
		}
	}
	zbzs[size2].addClass('zuobiaoYShow')
	lastz.addClass('zuobiaoYShow')
	lastz.html(zl * 16)

	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < values[i].length; j++) {
			if (values[i][j]) {
				valueTds[i][j].removeClass("fv")
				valueTds[i][j].addClass("tv")
			} else {
				valueTds[i][j].removeClass("tv")
				valueTds[i][j].addClass("fv")
			}
		}
	}
	valueTds[size][size].addClass("core")

	isShow = true
	hideXZ()
};

function showXZ(x, z) {
	if (!isPutDown) {
		$("#tipCoordinateX").text((x1 + x) * 16 + 8)
		$("#tipCoordinateZ").text((z1 + z) * 16 + 8)
		$("#tipChunkX").text(x1 + x)
		$("#tipChunkZ").text(z1 + z)
		$("#tipXZ").show()
		document.onmousemove = function(event) {
			var oDiv = document.getElementById('tipXZ');
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
			oDiv.style.left = event.clientX + scrollLeft - 50 + 'px';
			oDiv.style.top = event.clientY + scrollTop - 60 + 'px';
		}
	}
};
function hideXZ() {
	$("#tipXZ").hide()
	if (!isPutDown) {
		document.onmousemove = null
	}
};
function setXZ() {
	$("#x3").val(x3 * 16 + 8)
	$("#z3").val(z3 * 16 + 8)
};
function setTip(s) {
	$("#tip").text(s)
};
