class StorylinesController < ApplicationController
  def index
  	@storylines = Storyline.all
  	@storyline = Storyline.last # need a way to signal storyline is complete
    @turn = current_user.turn_number if current_user 
    

  	@phrase = Phrase.new
  	@picture = Picture.new
    @player = Player.new
    #@player.turn_number = 1
    #@turn = 3
    puts "**************"
    puts "in storyline index"
    puts params
    puts "**************"
    #binding.pry
  	respond_to do |format|
  	  format.html
  	end
  end

  def create  	
  	# need to add all the pictures & phrases before 
  	# creating and saving the storyline
    puts "**************"
    puts "in storyline create"
    puts "**************"
  	@storyline = Storyline.new(params[:storyline])
    #@storyline = Storyline.includes(phrases: :storyline_id).first
    
    # @picture = Picture.new(params[:picture])
    #@phrase = Phrase.new(params[:phrase])
    # @storyline.picture_id = @picture.id
    # @storyline.phrase_id = @phrase.id
    #Turn.last.turn_number ? @turn = Turn.last.turn_number : @turn = 1
    
    @storyline.turn = params[:turn_number]
    #@storyline.phrase_id = @phrase.id

  	@storyline.save()
  	binding.pry #this never executes - why?
    respond_to do |format|
      format.js
    end
  end

  # def show
  # 	@story = Story.find(params[:id])

  # 	respond_to do |format|
  # 	  format.js
  # 	end
  # end
end
