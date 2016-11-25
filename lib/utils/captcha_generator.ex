defmodule Acs.CaptchaGenerator do 
  
  def generate(value) do 
    image_file = Path.join(System.tmp_dir, "#{value}.png")
    params = "#{style_param} -size 80x20 xc:none -gravity center -pointsize 16 -implode 0.2 \
              -font Candice -annotate #{annotate_param} '#{value}' -wave -#{distortion_param} \
              #{image_file}" |> String.split 
    {_, 0} = System.cmd("convert", params)
    image_data = File.read!(image_file) |> Base.encode64
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
      :low -> "#{:rand.uniform(2) - 1}x#{79 + :rand.uniform(20)}"
      :medium -> "#{:rand.uniform(2) + 1}x#{49 + :rand.uniform(20)}"
      :high -> "#{:rand.uniform(2) + 3}x#{29 + :rand.uniform(20)}"
    end
  end

  defp annotate_param do 
    n = :rand.uniform(@distortion_num) - 1
    case Enum.at(@distortions, n) do 
      :low -> "#{:rand.uniform(10) - 1}x#{:rand.uniform(5)}"
      :medium -> "#{:rand.uniform(15) - 1}x#{:rand.uniform(10)}"
      :high -> "#{:rand.uniform(20) - 3}x#{:rand.uniform(15)}"
    end
  end

end