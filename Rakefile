##############################################################
#
# Artzilla Addon Builder 1.2
# http://artzilla.org - http://fffff.at
#
# Code by Jamie Wilkinson and Greg Leuch
#
##############################################################
#
# If you don't have rake (ruby make) installed, type:
#   sudo gem install rake
#
# If you don't have crxmake installed for Chrome extension building, type:
#   sudo gem source -a http://gemcutter.org
#   sudo gem install crxmake
#


# You can, where BROWSER is either safari, firefox, or chrome.
#
#   build:BROWSER       Package your add-on for given browser
#   install:BROWSER     Install add-on in browser (Mac only!)
#   upload:BROWSER      Deploy the latest version to your server
#                       (Requries VERSION to be specified.)
#   update:BROWSER      Update the Add-on Gallery server with latest version information.
#                       (Requires VERSION to be specified.)
#   deploy:BROWSER      Does both upload:BROWSER and update:BROWSER commands.
#                       (Requires VERSION to be specified.)



# SETTINGS
##############################################################


# Change if necessary (shouldn't need to...)
APP_ROOT = File.dirname(__FILE__)

# Base filename of app
APP_FILENAME = "tumblr-video-thumbnails"

# This is the app API key and URL from the add-on service (SOON!)
APP_API_KEY = ""
APP_API_URL = ""

# Set version through command, otherwise assume dev version
APP_VERSION = ENV['VERSION'] || 'dev'

# Permission keys
APP_KEYS_CHROME = "#{APP_ROOT}/keys/chrome.pem"

# Folder where extensions are saved
APP_EXTENSION_FOLDER = "#{APP_ROOT}/extensions"

# Folders where extensions are written
APP_PATH_FIREFOX  = "#{APP_ROOT}/firefox"
APP_PATH_CHROME   = "#{APP_ROOT}/chrome"
APP_PATH_SAFARI   = "#{APP_ROOT}/safari"


# Verbose output
verbose(false)

BROWSERS      = [:firefox, :chrome, :safari]
BROWSER_EXTS  = {:firefox => '.xpi', :chrome => '.crx', :safari => '.safariextz'}
BROWSER_APPS  = {:firefox => 'Firefox', :chrome => 'Google Chrome', :safari => 'Safari'}



##############################################################

require 'rubygems'
require 'crxmake'

puts "\nARTZILLA.ORG EXTENSION BUILDER"
puts "-"*85
puts "\n"

desc "Build add-on installation file."
namespace :build do
  
  # Firefox
  desc "Build Firefox add-on."
  task :firefox do
    app_filepath = "#{APP_EXTENSION_FOLDER}/firefox/#{APP_FILENAME}_#{APP_VERSION}.xpi"
    # Ensure folder path exists....
    sh "mkdir -p #{File.dirname(app_filepath)} > /dev/null 2>&1"

    # BUILD IT!
    puts "Building Firefox add-on..."
    sh "rm -f #{app_filepath} > /dev/null 2>&1"
    sh "cd #{APP_PATH_FIREFOX} && zip #{app_filepath} -r chrome chrome.manifest content install.rdf > /dev/null 2>&1"
    puts "Add-on built! (#{app_filepath})\n\n"
  end

  desc "Build Chrome add-on"
  task :chrome do
    app_filepath = "#{APP_EXTENSION_FOLDER}/chrome/#{APP_FILENAME}_#{APP_VERSION}.crx"
    # Ensure folder path exists....
    sh "mkdir -p #{File.dirname(app_filepath)} > /dev/null 2>&1"

    # BUILD IT!
    puts "Building Chrome add-on..."
    sh "rm -f #{app_filepath} > /dev/null 2>&1"
    CrxMake.make(:ex_dir => APP_PATH_CHROME, :pkey => APP_KEYS_CHROME, :crx_output => app_filepath, :verbose => false, :ignorefile => /\.swp/, :ignoredir => /\.(?:svn|git|cvs)/) rescue nil
    puts File.exists?(app_filepath) ? "Add-on built! (#{app_filepath})\n\n" : "\nERROR: Could not build Chrome add-on.\n\n"
  end

  desc "Build Safari add-on"
  task :safari do
    puts "Building Safari add-on..."
    puts "\n  SAFARI EXTENSION MUST BE BUILT USING SAFARI'S EXTENION MANAGER!\n  (Blame them for making this process as complex as installing Windows.)\n\n"
    puts ("-"*85) + ("\n"*3)
  end
end




# Install (Available only for Mac)
namespace :install do
  desc "Install add-on (Mac only!)"
  BROWSERS.each do |browser|
    task browser do
      begin
        app_filepath = "#{APP_EXTENSION_FOLDER}/#{browser.to_s}/#{APP_FILENAME}_#{APP_VERSION}#{BROWSER_EXTS[browser]}"

        puts "Installing #{BROWSER_APPS[browser]} add-on..."
        if File.exists?(app_filepath)
          sh "open -a '#{BROWSER_APPS[browser]}' #{app_filepath} > /dev/null 2>&1"
          puts "Done.\n\n"
        else
          puts "\nERROR: #{File.basename(app_filepath)} does not exist!\n\n"
        end
      rescue
        puts "\nERROR: #{$!}\n\n"
      end
    end
  end
end



# Send update to add-on server
namespace :update do
  desc "Update the add-on server"
  BROWSERS.each do |browser|
    task browser do
      begin
        raise "An API key is required for the add-on server authentication." if APP_API_KEY.nil? || APP_API_KEY.empty?
        raise "A URL is required for add-on server authentication." if APP_API_URL.nil? || APP_API_URL.empty?
        raise "Version specification is required. (Run: VERSION='x.x.x' rake update:#{browser})" if ENV['VERSION'].nil? || ENV['VERSION'].empty?

        puts "Upating add-on server #{browser.to_s.capitalize} to version #{APP_VERSION} add-on..."
        
        # sh "wget ..."
        # check output
        
      rescue
        puts "\nERROR: #{$!}\n\n"
      end
    end
  end
end