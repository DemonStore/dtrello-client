import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';

import { actions as taskActions, TaskData } from '../service/tasks';

export interface ModalComponentProps {
    taskId: number;
    onClose: () => void;
    getTask: (taskId: number) => void;
    taskEdit: (taskId: number, taskUpdate: any) => void;
    task: TaskData;
}

export interface ModalComponentState {
    title: string;
    description: string;
    sequence: number;
}

class Modal extends React.Component<ModalComponentProps, ModalComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {title: '', description: '', sequence: 0};
        this.handleSave = this.handleSave.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleSequenceUpdate = this.handleSequenceUpdate.bind(this);
    }

    componentDidMount(): void {
        const taskId = this.props.taskId;
        this.props.getTask(taskId);
    }

    render() {
        const { onClose, task } = this.props;
        const title = (task && task.title) || '';
        const description = (task && task.description) || '';
        const sequence = (task && task.sequence) || 1;
        const createdAt = (task && task.createdAt) || '';
        return (
            <Dialog open={!!task} onClose={() => onClose()}>
                <DialogTitle>Edit task</DialogTitle>
                {task && (
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="title"
                            label="Title"
                            type="text"
                            margin="normal"
                            fullWidth
                            defaultValue={title}
                            onBlur={this.handleTitleUpdate}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            type="text"
                            margin="normal"
                            fullWidth
                            defaultValue={description}
                            onBlur={this.handleDescriptionUpdate}
                        />
                        <TextField
                            id="sequence"
                            label="Sequence"
                            type="number"
                            margin="normal"
                            fullWidth
                            defaultValue={sequence}
                            onBlur={this.handleSequenceUpdate}
                        />
                        <TextField
                            id="created"
                            label="Created"
                            type="text"
                            margin="normal"
                            fullWidth
                            disabled
                            defaultValue={createdAt}
                        />
                    </DialogContent>
                )}
                <DialogActions>
                    <Button color="primary" onClick={() => this.handleSave()}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={() => onClose()}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handleTitleUpdate(event: any): void {
        this.setState({title: event.target.value});
    }

    private handleDescriptionUpdate(event: any): void {
        this.setState({description: event.target.value});
    }

    private handleSequenceUpdate(event: any): void {
        this.setState({sequence: event.target.value});
    }

    private handleSave(): void {
        const taskId = this.props.taskId;
        const updates: any = {};

        if (this.state.title) {
            updates['title'] = this.state.title;
        }

        if (this.state.description) {
            updates['description'] = this.state.description;
        }

        if (this.state.sequence) {
            updates['sequence'] = this.state.sequence;
        }

        this.props.taskEdit(taskId, updates);

        this.props.onClose();
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    getTask: (taskId: number) => {
        dispatch(taskActions.taskData(taskId));
    },
    taskEdit: (taskId: number, taskUpdate: any) => {
        dispatch(taskActions.taskEdit(taskId, taskUpdate));
    }
});

const mapStateToProps = (state: any) => {
    return {
        task: state.tasks.task
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);
