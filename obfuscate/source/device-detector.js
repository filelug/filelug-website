if (typeof UAParser === 'undefined') { throw new Error('DeviceDetector\'s JavaScript requires UAParser') };

var DeviceDetector = function (lang) {

	var language           = lang;
	var notSupportMessage;
	var isDeviceNotSupport = false,
		isWindows          = false,
		isMac              = false,
		isLinux            = false,
		is32Bits           = false,
		is64Bits           = false;

	this.getMessageNotSupportDevice = function() {
		var message;
		if ( language == DeviceDetector.LANGUAGE_EN )
			message = DeviceDetector.MSG_EN_NOT_SUPPORT_DEVICE
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANT )
			message = DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_DEVICE
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANS )
			message = DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_DEVICE
		return message;
	};
	this.getMessageNotSupportCPU1 = function() {
		var message;
		if ( language == DeviceDetector.LANGUAGE_EN )
			message = DeviceDetector.MSG_EN_NOT_SUPPORT_CPU_1
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANT )
			message = DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_CPU_1
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANS )
			message = DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_CPU_1
		return message;
	};
	this.getMessageNotSupportCPU2 = function() {
		var message;
		if ( language == DeviceDetector.LANGUAGE_EN )
			message = DeviceDetector.MSG_EN_NOT_SUPPORT_CPU_2
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANT )
			message = DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_CPU_2
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANS )
			message = DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_CPU_2
		return message;
	};
	this.getMessageNotSupportOS1 = function() {
		var message;
		if ( language == DeviceDetector.LANGUAGE_EN )
			message = DeviceDetector.MSG_EN_NOT_SUPPORT_OS_1
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANT )
			message = DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_OS_1
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANS )
			message = DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_OS_1
		return message;
	};
	this.getMessageNotSupportOS2 = function() {
		var message;
		if ( language == DeviceDetector.LANGUAGE_EN )
			message = DeviceDetector.MSG_EN_NOT_SUPPORT_OS_2
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANT )
			message = DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_OS_2
		else if ( language == DeviceDetector.LANGUAGE_ZH_HANS )
			message = DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_OS_2
		return message;
	};

	this.adjustPanels = function(txtNotSupport, panelNotSupport, panelWindows, panelMac, panelLinux, btnWin32, btnWin64, btnWin32Zip, btnWin64Zip, btnMac, btnLinux32Zip, btnLinux64Zip) {

		this.check();

		if ( isDeviceNotSupport ) {
			$("#"+txtNotSupport).append(notSupportMessage);
		} else {
			$("#"+panelNotSupport).remove();
		}
		if ( isWindows ) {
			if ( is32Bits ) {
				this.toggleButton(btnWin32, true);
				this.toggleButton(btnWin64, false);
				this.toggleButton(btnWin32Zip, true);
				this.toggleButton(btnWin64Zip, false);
			}
			if ( is64Bits ) {
				this.toggleButton(btnWin32, false);
				this.toggleButton(btnWin64, true);
				this.toggleButton(btnWin32Zip, false);
				this.toggleButton(btnWin64Zip, true);
			}
		} else {
			$("#"+panelWindows).remove();
		}
		if ( isMac ) {
			this.toggleButton(btnMac, true);
		} else {
			$("#"+panelMac).remove();
		}
		if ( isLinux ) {
			if ( is32Bits ) {
				this.toggleButton(btnLinux32Zip, true);
				this.toggleButton(btnLinux64Zip, false);
			}
			if ( is64Bits ) {
				this.toggleButton(btnLinux32Zip, false);
				this.toggleButton(btnLinux64Zip, true);
			}
		} else {
			$("#"+panelLinux).remove();
		}
	};

	this.check = function(){

		var parser = new UAParser();
		//var uastr = "Opera/9.25 (OpenSolaris; U; en)";
		//parser.setUA(uastr);
		var result = parser.getResult();

		if ( result.device.type ) {
			if ( result.os.name && result.os.name == DeviceDetector.OS_WINDOWS ) {
				// Check for Windows Tablet PC
				isWindows = true;
				if ( !result.cpu.architecture && result.cpu.architecture == DeviceDetector.CPU_AMD64 ) {
					is64Bits = true;
				} else {
					is32Bits = true;
				}
			} else {
				isDeviceNotSupport = true;
				var deviceStr;
				if ( result.device.vendor ) {
					if ( result.device.model ) {
						deviceStr = result.device.vendor + " " + result.device.model;
					} else {
						deviceStr = result.device.vendor;
					}
				} else {
					deviceStr = result.device.type;
				}
				notSupportMessage = this.getMessageNotSupportDevice();
				notSupportMessage = notSupportMessage.format(deviceStr);
			}
		} else {
			if ( result.os.name ) {
				if ( result.os.name == DeviceDetector.OS_WINDOWS ) {
					isWindows = true;
				} else if ( result.os.name == DeviceDetector.OS_MAC ) {
					isMac = true;
				} else if ( result.os.name == DeviceDetector.OS_LINUX_ARCH || 
							result.os.name == DeviceDetector.OS_LINUX_CENT_OS || 
							result.os.name == DeviceDetector.OS_LINUX_DEBIAN || 
							result.os.name == DeviceDetector.OS_LINUX_FEDORA || 
							result.os.name == DeviceDetector.OS_LINUX_GENTOO || 
							result.os.name == DeviceDetector.OS_LINUX_GNU || 
							result.os.name == DeviceDetector.OS_LINUX_HURD || 
							result.os.name == DeviceDetector.OS_LINUX_JOLI || 
							result.os.name == DeviceDetector.OS_LINUX_LINPUS || 
							result.os.name == DeviceDetector.OS_LINUX_LINUX || 
							result.os.name == DeviceDetector.OS_LINUX_MAGEIA || 
							result.os.name == DeviceDetector.OS_LINUX_MANDRIVA || 
							result.os.name == DeviceDetector.OS_LINUX_MINT || 
							result.os.name == DeviceDetector.OS_LINUX_PC_LINUX_OS || 
							result.os.name == DeviceDetector.OS_LINUX_RED_HAT || 
							result.os.name == DeviceDetector.OS_LINUX_SLACKWARE || 
							result.os.name == DeviceDetector.OS_LINUX_SUSE || 
							result.os.name == DeviceDetector.OS_LINUX_UBUNTU || 
							result.os.name == DeviceDetector.OS_LINUX_VECTOR_LINUX || 
							result.os.name == DeviceDetector.OS_LINUX_ZENWALK ) {
					isLinux = true;
				}
				if ( isWindows || isLinux ) {
					if ( !result.cpu.architecture || result.cpu.architecture == DeviceDetector.CPU_IA32 ) {
						is32Bits = true;
					} else if ( result.cpu.architecture == DeviceDetector.CPU_AMD64 ) {
						is64Bits = true;
					} else {
						isDeviceNotSupport = true;
						notSupportMessage = this.getMessageNotSupportCPU1();
						notSupportMessage = notSupportMessage.format(result.cpu.architecture);
						if ( isWindows ) {
							isWindows = false;
						} else {
							isLinux = false;
						}
					}
				} else if ( isMac ) {
					if ( result.cpu.architecture ) {
						isDeviceNotSupport = true;
						notSupportMessage = this.getMessageNotSupportCPU2();
						notSupportMessage = notSupportMessage.format(result.cpu.architecture);
						isMac = false;
					}
				} else {
					isDeviceNotSupport = true;
					notSupportMessage = this.getMessageNotSupportOS1();
					notSupportMessage = notSupportMessage.format(result.os.name);
				}
			} else {
				isDeviceNotSupport = true;
				notSupportMessage = this.getMessageNotSupportOS2();
			}
		}
		
	}

	this.toggleButton = function(element_id, canDownload) {
		var element = $("#"+element_id);
		if ( canDownload ) {
			element.removeClass('btn-default');
			element.addClass('btn-danger');
			$("#"+element_id+"-desc").show();
		}
	};

};

DeviceDetector.LANGUAGE_EN                  = 'en',
DeviceDetector.LANGUAGE_ZH_HANT             = 'zh-hant',
DeviceDetector.LANGUAGE_ZH_HANS             = 'zh-hans',
DeviceDetector.OS_WINDOWS                   = 'Windows',
DeviceDetector.OS_MAC                       = 'Mac OS',
DeviceDetector.OS_LINUX_ARCH                = 'Arch',
DeviceDetector.OS_LINUX_CENT_OS             = 'CentOS',
DeviceDetector.OS_LINUX_DEBIAN              = 'Debian',
DeviceDetector.OS_LINUX_FEDORA              = 'Fedora',
DeviceDetector.OS_LINUX_GENTOO              = 'Gentoo',
DeviceDetector.OS_LINUX_GNU                 = 'GNU',
DeviceDetector.OS_LINUX_HURD                = 'Hurd',
DeviceDetector.OS_LINUX_JOLI                = 'Joli',
DeviceDetector.OS_LINUX_LINPUS              = 'Linpus',
DeviceDetector.OS_LINUX_LINUX               = 'Linux',
DeviceDetector.OS_LINUX_MAGEIA              = 'Mageia',
DeviceDetector.OS_LINUX_MANDRIVA            = 'Mandriva',
DeviceDetector.OS_LINUX_MINT                = 'Mint',
DeviceDetector.OS_LINUX_PC_LINUX_OS         = 'PCLinuxOS',
DeviceDetector.OS_LINUX_RED_HAT             = 'RedHat',
DeviceDetector.OS_LINUX_SLACKWARE           = 'Slackware',
DeviceDetector.OS_LINUX_SUSE                = 'SUSE',
DeviceDetector.OS_LINUX_UBUNTU              = 'Ubuntu',
DeviceDetector.OS_LINUX_VECTOR_LINUX        = 'VectorLinux',
DeviceDetector.OS_LINUX_ZENWALK             = 'Zenwalk',
DeviceDetector.CPU_IA32                     = 'ia32',
DeviceDetector.CPU_AMD64                    = 'amd64';

DeviceDetector.MSG_EN_NOT_SUPPORT_DEVICE    = 'Your device: {0} is not supported. You can only run this application on desktop or laptop computers.',
DeviceDetector.MSG_EN_NOT_SUPPORT_CPU_1     = 'The cpu architecture({0}) of your computer is not supported. You can only run this application on x86 or x64 cpu architecture.',
DeviceDetector.MSG_EN_NOT_SUPPORT_CPU_2     = 'The cpu architecture({0}) of your computer is not supported. You can only run this application on Intel cpu architecture.',
DeviceDetector.MSG_EN_NOT_SUPPORT_OS_1      = 'The operating system ({0}) of your computer is not supported. You can only run this application on Windows, Mac, or Linux.',
DeviceDetector.MSG_EN_NOT_SUPPORT_OS_2      = 'You can only run this application on Windows, Mac, or Linux.';

DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_DEVICE = '不支援裝置：{0}，應用程式僅限安裝於桌上型電腦或筆電！',
DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_CPU_1  = '不支援 CPU 架構：{0}，應用程式僅限安裝於 x86 或 x64 CPU 架構！',
DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_CPU_2  = '不支援 CPU 架構：{0}，應用程式僅限安裝於 Intel CPU 架構！',
DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_OS_1   = '不支援作業系統：{0}，應用程式僅限安裝於 Windows、Mac、或 Linux 作業系統！',
DeviceDetector.MSG_ZH_TW_NOT_SUPPORT_OS_2   = '應用程式僅限安裝於 Windows、Mac、或 Linux 作業系統！';

DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_DEVICE = '不支持装置：{0}，应用程序仅限安装于桌上型电脑或笔电！',
DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_CPU_1  = '不支持 CPU 架构：{0}，应用程序仅限安装于 x86 或 x64 CPU 架构！',
DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_CPU_2  = '不支持 CPU 架构：{0}，应用程序仅限安装于 Intel CPU 架构！',
DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_OS_1   = '不支持操作系统：{0}，应用程序仅限安装于 Windows、Mac、或 Linux 操作系统！',
DeviceDetector.MSG_ZH_CN_NOT_SUPPORT_OS_2   = '应用程序仅限安装于 Windows、Mac、或 Linux 操作系统！';

String.prototype.format = function () {
	var args = [].slice.call(arguments);
	return this.replace(/(\{\d+\})/g, function (a) {
		return args[+(a.substr(1,a.length-2))||0];
	});
};
