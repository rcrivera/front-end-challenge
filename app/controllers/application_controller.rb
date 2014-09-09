class ApplicationController < ActionController::Base
  class Exception::BadRequest < StandardError; end
  class Exception::Unathorized < StandardError; end
  class Exception::Forbidden < StandardError; end
  class Exception::DoesNotExist < StandardError; end
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def page

  end

  def autocomplete
    meta = {}
    notifications = {}
    response = {}
    begin
      raise Exception::BadRequest.new(:param_error) unless (params[:q].present?)
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
      q = params[:q].strip
      results = []
      contacts.each do |c|
      	if(c[:name].downcase.include?(q.downcase) || c[:email].downcase.include?(q.downcase) || c[:phone].include?(q))
      		results << c
      	end
      end

    	response[:total] = results.count
      response[:query] = q.downcase
    	response[:contacts] = results

      meta = api_json_meta(200,nil,nil,nil)

      rescue Exception::BadRequest => e
        meta = api_json_meta(400, e.message, nil, nil)
      rescue Exception::Unathorized => e
        meta = api_json_meta(401, e.message, nil, nil)
      rescue Exception::Forbidden => e
        meta = api_json_meta(403, e.message, nil, nil)
      end

      respond_to do |format|
        format.json do
          render :json => api_json(meta,notifications,response)
        end
      end
    end

    def add_contact
      meta = {}
      notifications = {}
      response = {}
      begin
        contact = params[:contact]

  		raise Exception::BadRequest.new(:param_error) unless (contact.present?)

      emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      if (!emailRegex.match(contact))
        if (contact.length != 10 && contact.length != 11) then
          raise Exception::BadRequest.new(:param_error)
        else
          number_regex = /\d[0-9]\)*\z/
          if (!number_regex.match(contact))
            raise Exception::BadRequest.new(:param_error)
          end
        end
      end

      response[:success] = true.to_s

      meta = api_json_meta(200,nil,nil,nil)

      rescue Exception::BadRequest => e
        meta = api_json_meta(400, e.message, nil, nil)
      rescue Exception::Unathorized => e
        meta = api_json_meta(401, e.message, nil, nil)
      rescue Exception::Forbidden => e
        meta = api_json_meta(403, e.message, nil, nil)
      end
      respond_to do |format|
        format.json do
          render :json => api_json(meta,notifications,response)
        end
      end
    end

    def send_message
      meta = {}
      notifications = {}
      response = {}
      begin
      	recipient_array = params[:recipients]
      	message = params[:message]
        emails = Array.new
      	raise Exception::BadRequest.new(:param_error) unless recipient_array.present? && message.present? 

      	raise Exception::BadRequest.new(:param_error) unless message.length < 141
		
    		recipient_array.each do |recipient|
          if recipient != nil then
            emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
            if (!emailRegex.match(recipient))
              if (recipient.length != 10 && recipient.length != 11) then
                raise Exception::BadRequest.new(:param_error)
              end
              number_regex = /\d[0-9]\)*\z/
              if (!number_regex.match(recipient))
                raise Exception::BadRequest.new(:param_error)
              end
            else
              emails << recipient
            end
          end
  		  end

    		response[:total] = recipient_array.count.to_s
    		response[:message] = message
    		response[:success] = true.to_s
    		
        meta = api_json_meta(200,nil,nil,nil)

        rescue Exception::BadRequest => e
          meta = api_json_meta(400, e.message, nil, nil)
        rescue Exception::Unathorized => e
          meta = api_json_meta(401, e.message, nil, nil)
        rescue Exception::Forbidden => e
          meta = api_json_meta(403, e.message, nil, nil)
      end

      respond_to do |format|
        format.json do
          render :json => api_json(meta,notifications,response)
        end
      end
    end

    def api_json(meta, notifications, response)
      json = {}
      json[:meta] = meta
      json[:notifications] = notifications
      json[:response] = response
      return json
    end

    def api_json_meta(status_code,errortype,errordetail,errormessage)
      if(status_code == 200)
        meta = {:code => 200}
      elsif(errordetail.nil? && errormessage.nil?)
        meta = {:code => status_code,
                :error_type => errortype}
      elsif(errormessage.nil?)
        meta = {:code => status_code,
                :error_type => errortype,
                :error_detail => errordetail}
      else
        meta = {:code => status_code,
                :error_type => errortype,
                :error_detail => errordetail,
                :error_message => errormessage}
      end
      return meta
    end
end