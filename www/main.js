function get_map_data(map_size, callback) {
    var url = "http://127.0.0.1:8082/maprandom?size="+map_size;
    $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
                callback(data);
            },
        error: function(error, data) {
            alert('ajax not successful. '+JSON.stringify(error));
        }
    });
}

function display_map_canvas(map_data) {
    var map_id = 'map_display';
    var map_height = $('#'+map_id).height();
    var map_width = $('#'+map_id).width();
    var x_len  = map_data[0].length;
    var y_len  = map_data.length;
    var cell_height = Math.floor(map_height/x_len);
    var cell_width  = Math.floor(map_width/y_len);

    $('#'+map_id).html('');
    
    // Create and style a new canvas using gury
    $g().size(map_width, map_height).background("#000").add({
      // Draws the object onto the canvas (each frame, if animated)
      draw: function(ctx, canvas) {
        var x0 = 0, y0 = 0;

        $.each(map_data, function(i, row) {
            $.each(row, function(j, cell) {
                ctx.fillStyle = '#'+get_hex_color(cell);
                ctx.fillRect(x0, y0, cell_width, cell_height);
                x0 += cell_width;
            });
            x0 = 0;
            y0 += cell_height;
        });
      }
    }).place("#map_display").draw();
}

// Should convert number from 1-100 to color... from green to red for now
// Give it a value from 1-100, will return a value ranging from red to green
function get_hex_color(val) {
    var red_val   = Math.round(val*2.55);
    var green_val = 255 - red_val;
    var blue_val  = 0;

    // Convert to hex
    red_val =   convert_2_hex_string(red_val);
    green_val = convert_2_hex_string(green_val);
    blue_val =  convert_2_hex_string(blue_val);

    return red_val+green_val+blue_val;
}

// String should be of length 2
function convert_2_hex_string(val) {
    var str = val.toString(16); // Base10 to Base16 (string)
    if(str.length == 1) str = "0"+str;
    return str;
}
