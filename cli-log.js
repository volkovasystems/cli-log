/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "cli-log",
			"fileName": "cli-log.js",
			"moduleName": "cliLog",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/cli-log.git",
			"testCase": "cli-log-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
	@end-include
*/
var cliLog = function cliLog( CLI, specificNamespace ){

	CLI.SESSION.CLI_LOG = "cli-log";

	this.listenToEvent( CLI.EVENT.LINE_STRING_MODIFIED, specificNamespace,
		function cliLog( line, commandLineInterface ){
			if( LOG_ON_COMMAND_PATTERN.test( line ) ){
				this.transformAsCLISession( CLI.SESSION.CLI_LOG, specificNamespace, [ CLI.SESSION.CLI_ECHO ] );
				return;
			}

			if( LOG_OFF_COMMAND_PATTERN.test( line ) ){
				this.fireEvent( CLI.EVENT.CLI_SESSION_ENDED, specificNamespace, CLI.SESSION.CLI_LOG );
				return;
			}

			if( this.checkIfOnCLISession( CLI.SESSION.CLI_LOG ) ){
				console.log( line );
				return;
			}
		} );
};

const LOG_ON_COMMAND_PATTERN = /^\@log\:\s*[Oo][Nn]\s*$/;
const LOG_OFF_COMMAND_PATTERN = /^\@log\:\s*[Oo][Ff]{2}\s*$/;

module.exports = cliLog;