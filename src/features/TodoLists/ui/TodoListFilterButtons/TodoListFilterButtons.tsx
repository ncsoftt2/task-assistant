import {Button, ButtonGroup} from "@mui/material";
import {TodoFilterType} from "features/TodoLists/model/slice/todoSlice";


type Props = {
    disabled: boolean
    handleChangeFilter: (value: TodoFilterType) => void
    filter: TodoFilterType
}

export const TodoListFilterButtons = (props: Props) => {
    const {handleChangeFilter,filter,disabled} = props
    return (
        <ButtonGroup variant="contained" disabled={disabled}>
            <Button onClick={() => handleChangeFilter('all')}
                    variant={filter === 'all' ? 'contained' : "outlined"}
                    color={filter === 'all' ? 'primary' : 'secondary'}>
                Все
            </Button>
            <Button onClick={() => handleChangeFilter('active')}
                    variant={filter === 'active' ? 'contained' : "outlined"}
                    color={filter === 'active' ? 'primary' : 'secondary'}>
                Активные
            </Button>
            <Button onClick={() => handleChangeFilter('completed')}
                    variant={filter === 'completed' ? 'contained' : "outlined"}
                    color={filter === 'completed' ? 'primary' : 'secondary'}>
                Выполненые
            </Button>
        </ButtonGroup>
    )
}