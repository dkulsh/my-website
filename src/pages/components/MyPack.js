import * as d3 from "d3";
import { useEffect, useRef } from "react";
import './MyPack.css';

function CircleHierarchy() {

    var data = {
        "name": "A1",
        "children": [
            {
                "name": "B1",
                "children": [
                    {
                        "name": "C1",
                        "value": 110
                    },
                    {
                        "name": "C2",
                        "value": 300
                    },
                    {
                        "name": "C3",
                        "value": 200
                    }
                ]
            },
            {
                "name": "B2",
                "value": 200
            }
        ]
    };

    var packLayout = d3.pack().size([300, 300]);

    var rootNode = d3.hierarchy(data)

    rootNode.sum(function(d) {
        return d.value;
    });

    packLayout(rootNode);

    var nodes = d3.select('svg')
        .selectAll('g')
        .data(rootNode.descendants())
        .join('g')
        .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})

    nodes
        .append('circle')
        .attr('r', function(d) { return d.r; })

    nodes
        .append('text')
        .attr('dy', 4)
        .text(function(d) {
            return d.children === undefined ? d.data.name : '';
        })
}

function MyPack() {

    return (
        <svg width="320" height="320" >
            {/* <g> */}
            <CircleHierarchy />
            {/* </g> */}
        </svg>
    )
}

export default MyPack;