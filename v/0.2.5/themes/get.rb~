
Dir.glob("*.min.css").each do |f|
    name = f.chomp.split('.')[0]
    %x[wget http://bootswatch.com/#{name}/bootstrap.min.css]
    %x[mv bootstrap.min.css #{name}.min.css]
end

