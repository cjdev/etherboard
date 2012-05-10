/*jslint newcap: false*/
/*global $ alert */

/*
 * Copyright (C) 2011, 2012 Commission Junction
 *
 * This file is part of etherboard.
 *
 * etherboard is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2, or (at your option)
 * any later version.
 *
 * etherboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with etherboard; see the file COPYING.  If not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * Linking this library statically or dynamically with other modules is
 * making a combined work based on this library.  Thus, the terms and
 * conditions of the GNU General Public License cover the whole
 * combination.
 *
 * As a special exception, the copyright holders of this library give you
 * permission to link this library with independent modules to produce an
 * executable, regardless of the license terms of these independent
 * modules, and to copy and distribute the resulting executable under
 * terms of your choice, provided that you also meet, for each linked
 * independent module, the terms and conditions of the license of that
 * module.  An independent module is a module which is not derived from
 * or based on this library.  If you modify this library, you may extend
 * this exception to your version of the library, but you are not
 * obligated to do so.  If you do not wish to do so, delete this
 * exception statement from your version.
 */

function Avatar(avatar, parent, boardId, webSocketClient){
    var widgetId = 'widget' + avatar.id;
	$('<img id="' + widgetId + '" class="avatar" src="' + avatar.name + '"></img>').css(avatar.pos).appendTo(parent)
	.draggable({
        drag: function(event, ui) {
                        var msg = {
                            type: "positionChange",
                            widgetId: widgetId,
                            position:  $(this).offset()
                        };
                        webSocketClient.send( JSON.stringify(msg));
                    },
		stop: function(event){
            event.stopPropagation();
			avatar.pos = $(this).offset();
            $.ajax('/board/' + boardId + '/objects/' + avatar.id,{
                dataType:'json',
                data:JSON.stringify(avatar),
                type:'PUT',
                success:function(createdObject){
                },
                error:function(jqXHR, textStatus, errorThrown){
                    alert("ERROR:" + textStatus);
                }
            });
        }
	});
}
