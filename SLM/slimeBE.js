function quiteSlimeChunkBE(x1, x2, z1, z2) {
	let BE_xSize = x2 - x1 + 1
	let BE_zSize = z2 - z1 + 1
	let value = []
	for (let i = 0; i < BE_zSize; i++) {
		value[i] = []
		for (let j = 0; j < BE_xSize; j++) {
			value[i][j] = isSlimy(x1 + j, z1 + i)
		}
	};
	//console.log(value)
	return value
};

function isSlimy(x, z) {
	let x_uint = x >>> 0;
	let z_uint = z >>> 0;
	let seed = umul32_lo(x_uint, 0x1f1f1f1f) ^ z_uint;
	let mt = new MersenneTwister(seed);
	let n = mt.random_int();
	return n % 10 == 0;
};

function MersenneTwister(t) {
	null == t && (t = (new Date).getTime()),
		this.N = 624,
		this.M = 397,
		this.MATRIX_A = 2567483615,
		this.UPPER_MASK = 2147483648,
		this.LOWER_MASK = 2147483647,
		this.mt = new Array(this.N),
		this.mti = this.N + 1,
		t.constructor == Array ? this.init_by_array(t, t.length) : this.init_seed(t)
};

MersenneTwister.prototype.init_seed = function(t) {
	for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
		t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
		this.mt[this.mti] = (1812433253 * ((4294901760 & t) >>> 16) << 16) + 1812433253 * (65535 & t) + this.mti,
		this.mt[this.mti] >>>= 0
	}
};

/*MersenneTwister.prototype.init_by_array = function(t, e) {
	var n, r, o;
	for (this.init_seed(19650218), n = 1, r = 0, o = this.N > e ? this.N : e; o; o--) {
		var i = this.mt[n - 1] ^ this.mt[n - 1] >>> 30;
		this.mt[n] = (this.mt[n] ^ (1664525 * ((4294901760 & i) >>> 16) << 16) + 1664525 * (65535 & i)) + t[r] + r,
			this.mt[n] >>>= 0, r++, ++n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1), r >= e && (r = 0)
	}
	for (o = this.N - 1; o; o--) {
		i = this.mt[n - 1] ^ this.mt[n - 1] >>> 30;
		this.mt[n] = (this.mt[n] ^ (1566083941 * ((4294901760 & i) >>> 16) << 16) + 1566083941 * (65535 & i)) - n,
			this.mt[n] >>>= 0, ++n >= this.N && (this.mt[0] = this.mt[this.N - 1], n = 1)
	}
	this.mt[0] = 2147483648
};*/

MersenneTwister.prototype.random_int = function() {
	var t, e = new Array(0, this.MATRIX_A);
	if (this.mti >= this.N) {
		var n;
		for (this.mti == this.N + 1 && this.init_seed(5489), n = 0; n < this.N - this.M; n++)
			t = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + this.M] ^ t >>>
				1 ^ e[1 & t];
		for (; n < this.N - 1; n++)
			t = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + (this.M -
				this.N)] ^
				t >>> 1 ^ e[1 & t];
		t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M -
			1] ^ t >>> 1 ^ e[1 & t], this.mti = 0
	}
	return t = this.mt[this.mti++],
		t ^= t >>> 11, t ^= t << 7 & 2636928640,
		t ^= t << 15 & 4022730752,
		(t ^= t >>> 18) >>> 0
};

function umul32_lo(a, b) {
	var a00 = 65535 & a,
		b00 = 65535 & b,
		c00 = a00 * b00,
		c16 = c00 >>> 16;
	return c16 += (a >>> 16) * b00,
		c16 &= 65535,
		((65535 & (c16 += a00 * (b >>> 16))) << 16 | 65535 & c00) >>> 0;
};
