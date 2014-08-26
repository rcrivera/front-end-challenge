# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Contact.create(
	contacts = [
  	{:name => "Aldo Briano", 
  	 :email => "aldo@yiftee.com",
  	 :phone => "7873602289"},
  	{:name => "Veronica Borges", 
  	 :email => "veronica@yiftee.com",
  	 :phone => "6505551212"},
  	{:name => "Jon Kepecs", 
  	 :email => "jon@yiftee.com",
  	 :phone => "4082352354"},
  	{:name => "Steve Chan", 
  	 :email => "steve@yiftee.com",
  	 :phone => "3031125555"}
  ]
)