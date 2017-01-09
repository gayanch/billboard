var Validator = function () {
	//this.input = input;

	//regexps
	this.alphanumeric_regex = new RegExp("^[a-zA-Z0-9_]+$", "i");
	this.numbers_regex = new RegExp("^[0-9]+$");
	this.ip_regex = new RegExp("^http[s]?://[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(:[0-9]{2,5})?$");
	this.domain_name_regexp = new RegExp("^[a-zA-z0-9]*\.[a-z]{2,6}(:[0-9]{2,7})?$");
}

Validator.prototype.alphanumeric = function(input) {
	return this.alphanumeric_regex.test(input);
}

Validator.prototype.numbers = function(input) {
	return this.numbers_regex.test(input);
}

Validator.prototype.ip = function(input) {
	return this.ip_regex.test(input);
}

Validator.prototype.domain_name = function(input) {
	return this.domain_name_regexp.test(input);
}
