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
# If you don't have crxmake instaleld for Chrome extension building, type:
#   sudo gem install crxmake
#

require 'rubygems'
require 'crxmake'




# Change if necessary (shouldn't need to...)
APP_ROOT = File.dirname(__FILE__)

# Base filename of app
APP_FILENAME = "tumblr-video-thumbnails"

# This is the app key from the add-on service (SOON!)
APP_API_KEY = ""

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



##############################################################

desc "Build add-on installation file."
namespace :build do
  
  # Firefox
  desc "Build Firefox add-on."
  task :firefox do
    app_filepath = "#{APP_EXTENSION_FOLDER}/firefox/#{APP_FILENAME}_#{APP_VERSION}.xpi"

    # Ensure folder path exists....
    sh "mkdir -p #{File.dirname(app_filepath)}"

    # BUILD IT!
    puts "Building Firefox add-on...\n\n"
    sh "rm -f #{app_filepath}"
    sh "cd #{APP_PATH_FIREFOX} && zip #{app_filepath} -r chrome chrome.manifest content install.rdf"
    puts "\nAdd-on built! (#{app_filepath})"
  end

  desc "Build Chrome extension"
  task :chrome do
    app_filepath = "#{APP_EXTENSION_FOLDER}/chrome/#{APP_FILENAME}_#{APP_VERSION}.crx"

    # Ensure folder path exists....
    sh "mkdir -p #{File.dirname(app_filepath)}"

    # BUILD IT!
    puts "Building Chrome extension"
    sh "rm -f #{app_filepath}"
    CrxMake.make(:ex_dir => APP_PATH_CHROME, :pkey   => APP_KEYS_CHROME, :crx_output => app_filepath, :verbose => false, :ignorefile => /\.swp/, :ignoredir => /\.(?:svn|git|cvs)/) rescue nil
    puts File.exists?(app_filepath) ? "\nAdd-on built! (#{app_filepath})" : "\n\nERROR: Could not build Chrome extension"
  end

  desc "Build Safari add-on"
  task :safari do
    puts "Building Safari add-on"
    puts "BUILD METHOD SOON!"
  end

end