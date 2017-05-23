defmodule Acs.CaptchaGenerator do 
  use LogAlias

  def generate(value) do 
    image_file = Path.join(System.tmp_dir, "#{value}.png")
    params = "-size 80x20 xc:none #{style_param()} -gravity center -pointsize 16 -implode 0.4 \
              -font Candice -annotate #{annotate_param()} #{value} -wave -#{distortion_param()} \
              #{image_file}" |> String.split 

    d "params: #{inspect params}"

    {_, 0} = System.cmd("convert", params)
    image_data = File.read!(image_file) |> Base.encode64
    File.rm!(image_file)
    "data:image/png;base64,#{image_data}"
  end

  @style_params %{
    simply_red: "-fill darkred",
    simply_green: "-fill darkgreen",
    simply_blue: "-fill darkblue",
  }
  @styles Map.keys(@style_params)
  @style_num Enum.count(@styles)

  defp style_param do 
    n = :rand.uniform(@style_num) - 1
    style = Enum.at(@styles, n)
    @style_params[style]
  end

  @distortions [:low, :medium, :high]
  @distortion_num Enum.count(@distortions)

  defp distortion_param do 
    n = :rand.uniform(@distortion_num) - 1
    case Enum.at(@distortions, n) do 
      :low -> "#{:rand.uniform(2)}x#{80 + :rand.uniform(10)}"
      :medium -> "#{:rand.uniform(2) + 1}x#{70 + :rand.uniform(10)}"
      :high -> "#{:rand.uniform(2) + 2}x#{60 + :rand.uniform(10)}"
    end
  end

  defp annotate_param do 
    n = :rand.uniform(@distortion_num) - 1
    {xdegree, ydegree} = case Enum.at(@distortions, n) do 
                            :low -> {6 + :rand.uniform(4), 6 + :rand.uniform(5)}
                            :medium -> {8 + :rand.uniform(4), 8 + :rand.uniform(5)}
                            :high -> {10 + :rand.uniform(4), 10 + :rand.uniform(5)}
                          end

    xdegree = if :rand.uniform(2) == 2 do 
                360 - xdegree
              else 
                xdegree
              end

   "#{xdegree}x#{ydegree}"
  end

end