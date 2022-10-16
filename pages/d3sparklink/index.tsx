
import { styled, experimental_extendTheme } from "@mui/material/styles";
import clsx from "clsx";
import { useEffect, useState } from 'react';
import * as d3 from "d3";
import { PrimaryLayout } from "../../components/primaryLayout";
import styles from "../../styles/d3sparklink.module.scss";

const Wrapper = styled("div")(({ theme }) => ({
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    padding: '20rem 0'
}));

const Figure = styled("figure")(({ theme }) => ({
    margin: '0',
    flex: '0 1 22.3rem',
    aspectRatio: '6 / 2',
    display: 'flex'
}));

const UL = styled("ul")(({ theme }) => ({
    listStyle: 'none',
    margin: '0',
    padding: '0'
}));

const P = styled("p")(({ theme }) => ({
    margin: '0',
    fontSize: '2rem'
}));

const Legend = styled("legend")(({ theme }) => ({
    textAlign: 'center',
    minWidth: '10rem',
    margin: '0 auto'
}));



const D3sparkLinkChart = () => {
    const init = () => {
        const dimensions = {
            width: 600,
            height: 200,
            marginTop: 8
        }

        const xAccessor = (d: any) => d.date
        const yAccessor = (d: any) => d.downloads

        const formatDate = d3.timeFormat('%Y-%m-%d')

        const getText = (data: any, d: any) => {
            const to = xAccessor(d)
            const from = d3.timeDay.offset(to, -7)

            return `${formatDate(from)} to ${formatDate(to)}`
        }

        const draw = (data: any) => {
            const wrapper = d3.select('[data-wrapper]')

            const svg = wrapper
                .select('[data-chart]')
                .append('svg')
                .attr('width', dimensions.width)
                .attr('height', dimensions.height)
                .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)

            const xDomain: any = d3.extent(data, xAccessor)
            const yDomain: any = [0, d3.max(data, yAccessor)]

            const xScale = d3.scaleTime()
                .domain(xDomain)
                .range([0, dimensions.width])

            const yScale = d3.scaleLinear()
                .domain(yDomain)
                .range([dimensions.height, dimensions.marginTop])

            /* Area */
            const areaGenerator = d3.area()
                .x((d: any) => xScale(xAccessor(d)))
                .y1((d: any) => yScale(yAccessor(d)))
                .y0(dimensions.height)
                .curve(d3.curveBumpX)

            const area = svg
                .append('path')
                .datum(data)
                .attr('d', areaGenerator)
                .attr('fill', 'var(--fill)')

            /* Line */
            const lineGenerator = d3.line()
                .x((d: any) => xScale(xAccessor(d)))
                .y((d: any) => yScale(yAccessor(d)))
                .curve(d3.curveBumpX)

            const line = svg
                .append('path')
                .datum(data)
                .attr('d', lineGenerator)
                .attr('stroke', 'var(--stroke)')
                .attr('stroke-width', 5)
                .attr('stroke-linejoin', 'round')
                .attr('fill', 'none')

            /* Markers */
            const markerLine = svg
                .append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', dimensions.height)
                .attr('stroke-width', 3)
                .attr('stroke', 'var(--marker, var(--stroke))')
                .attr('opacity', 0)

            const markerDot = svg
                .append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 8)
                .attr('fill', 'var(--marker, var(--stroke))')
                .attr('opacity', 0)

            /* Bisector */
            const bisect = d3.bisector(xAccessor)

            /* Events */
            svg.on('mousemove', (e: any) => {
                const [posX, posY] = d3.pointer(e)
                const date = xScale.invert(posX)

                const index = bisect.center(data, date)
                const d = data[index]

                const x = xScale(xAccessor(d))
                const y = yScale(yAccessor(d))

                markerLine
                    .attr('x1', x)
                    .attr('x2', x)
                    .attr('opacity', 1)

                markerDot
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('opacity', 1)

                d3.select('[data-heading]').text(getText(data, d))
                d3.select('[data-total]').text(yAccessor(d))
            })

            svg.on('mouseleave', () => {
                const lastDatum = data[data.length - 1]

                markerLine.attr('opacity', 0)
                markerDot.attr('opacity', 0)

                d3.select('[data-heading]').text('Weekly downloads')
                d3.select('[data-total]').text(yAccessor(lastDatum))
            })
        }

        const sortData = (data: any) => {
            return data.map((d: any) => {
                return {
                    ...d,
                    date: new Date(d.date)
                }
            }).sort((a: any, b: any) => d3.ascending(a.date, b.date))
        }

        d3.json('https://api.npoint.io/6142010a473d754de4e6')
            .then((data: any) => {
                const sortedData = sortData(data)
                draw(sortedData)
            })
            .catch((error: any) => console.log(error))

        /* Toggle color scheme */
        const inputs = d3.selectAll('input[type="radio"]')

        // const colors = inputs.nodes().map((input: any) => {
        //     return input.value
        // })

        d3.selectAll('input[type="radio"]')
            .on('click', (e) => {
                const { value, checked } = e.target;
                let colors = [`${styles.red}`, `${styles.blue}`, 'undefined'];
                if (!value || !checked) return

                document.body.classList.remove(...colors);
                document.body.classList.add(`${styles[value]}`)
            })
    }

    const [value, setValue] = useState('purple');

    const handleChange = (e:any) => {
        const { value, checked } = e.target;
        setValue(value)
    };

    useEffect(() => {
        init();
    }, [])
    return (
        <PrimaryLayout>
            <Wrapper>
                <div className={clsx(styles.controls)}>
                    <fieldset className={clsx(styles.fieldsetHeader)}>
                        <Legend>Toggle color scheme</Legend>
                        <UL className={clsx(styles.controlslist)}>
                            <li>
                                <input type="radio" name="color scheme" value="purple" id="c-purple" checked={value === 'purple'} onChange={handleChange} />
                                <label htmlFor="c-purple">Purple</label>
                            </li>
                            <li>
                                <input type="radio" name="color scheme" value="red" id="c-red" checked={value === 'red'} onChange={handleChange} />
                                <label htmlFor="c-red">Red</label>
                            </li>
                            <li>
                                <input type="radio" name="color scheme" value="blue" id="c-blue" checked={value === 'blue'} onChange={handleChange} />
                                <label htmlFor="c-blue">Blue</label>
                            </li>
                        </UL>
                    </fieldset>
                </div>
                <div className={clsx(styles.chartwrapper)} data-wrapper>
                    <h3 className={clsx(styles.title)} data-heading>Weekly downloads</h3>
                    <div className={clsx(styles.chartinfo)}>
                        <P data-total>200,000</P>
                    </div>
                    <Figure data-chart></Figure>
                </div>
            </Wrapper>
        </PrimaryLayout>
    )

}

export default D3sparkLinkChart